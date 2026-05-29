let pyodide = null;
let loading = false;
const waiters = [];

const TIMEOUT_MS = 60_000;

function ui(id) { return document.getElementById(id); }

function showOverlay(status, hint) {
  const card = ui('pyodide-loading').querySelector('.loading-card');
  card.classList.remove('is-error');
  ui('pyodide-spinner').hidden = false;
  ui('pyodide-status').textContent = status;
  ui('pyodide-hint').textContent = hint;
  ui('pyodide-close').hidden = true;
  ui('pyodide-loading').hidden = false;
}

function showError(msg) {
  const card = ui('pyodide-loading').querySelector('.loading-card');
  card.classList.add('is-error');
  ui('pyodide-spinner').hidden = true;
  ui('pyodide-status').textContent = '❌ ' + msg;
  ui('pyodide-hint').textContent = 'Проверьте подключение к интернету и попробуйте снова.';
  ui('pyodide-close').hidden = false;
}

function hideOverlay() {
  ui('pyodide-loading').hidden = true;
  ui('pyodide-loading').querySelector('.loading-card').classList.remove('is-error');
}

function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Время ожидания истекло (${ms / 1000} с)`)), ms)
  );
}

async function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Не удалось загрузить Pyodide с CDN'));
    document.head.appendChild(s);
  });
}

const DATA_FILES = [
  '/data/numbers.txt',
  '/data/students.txt',
  '/data/words.txt',
];

// Содержимое файлов — резервная копия на случай если fetch не сработает
const DATA_FALLBACK = {
  '/data/numbers.txt':  '10\n20\n30\n40\n50\n',
  '/data/students.txt': 'Алия,95\nБерик,78\nДаниар,62\nАйгерим,88\nНурлан,71\n',
  '/data/words.txt':    'python прост и элегантен\npython мощный и универсальный\npython используется в науке и бизнесе\nизучай python каждый день\nпрограммирование это творчество\n',
};

async function loadDataFiles(py) {
  try { py.FS.mkdir('/data'); } catch {}
  for (const path of DATA_FILES) {
    let text = DATA_FALLBACK[path] || '';
    try {
      const res = await fetch(path);
      if (res.ok) text = await res.text();
    } catch {}
    try { py.FS.writeFile(path, text, { encoding: 'utf8' }); } catch {}
  }
}

async function initPyodide() {
  if (pyodide) return pyodide;
  if (loading) return new Promise((r, e) => waiters.push([r, e]));

  loading = true;
  showOverlay('Загрузка Python…', 'Первый запуск может занять до 30–60 секунд');

  try {
    await Promise.race([
      loadScript('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js'),
      timeout(TIMEOUT_MS)
    ]);

    showOverlay('Инициализация Python…', 'Загружается среда выполнения (~15 МБ)');

    pyodide = await Promise.race([
      globalThis.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/' }),
      timeout(TIMEOUT_MS)
    ]);

    pyodide.runPython(`
import sys, io, builtins
class _Capture:
    def __init__(self): self._p = []
    def write(self, s): self._p.append(str(s))
    def flush(self): pass
    def getvalue(self): return ''.join(self._p)
def input(prompt=""):
    import js
    result = js.prompt(str(prompt) if prompt else "")
    if result is None:
        return ""
    return str(result)
builtins.input = input
`);

    await loadDataFiles(pyodide);

    waiters.forEach(([r]) => r(pyodide));
    hideOverlay();
    return pyodide;

  } catch (err) {
    pyodide = null;
    waiters.forEach(([, e]) => e(err));
    showError(err.message || 'Ошибка загрузки Python');
    throw err;
  } finally {
    loading = false;
    waiters.length = 0;
  }
}

export async function runPython(code) {
  let py;
  try {
    py = await initPyodide();
  } catch (err) {
    return { output: '', error: 'Python не загружен: ' + (err.message || err) };
  }

  try {
    py.runPython('_cap = _Capture(); sys.stdout = _cap; sys.stderr = _cap');
    py.runPython(code);
    const out = py.runPython('_cap.getvalue()');
    return { output: String(out), error: null };
  } catch (err) {
    let partial = '';
    try { partial = String(py.runPython('_cap.getvalue()')); } catch {}
    return { output: partial, error: formatError(String(err.message || err)) };
  } finally {
    try { py.runPython('sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__'); } catch {}
  }
}

function formatError(msg) {
  if (!msg) return 'Неизвестная ошибка';
  const lines = msg.split('\n').map(l => l.trim()).filter(Boolean);
  const error = lines.find(l => /Error:|Exception:/.test(l));
  const loc = lines.find(l => /line \d+/.test(l));
  const parts = [];
  if (loc) parts.push(loc);
  if (error) parts.push(error);
  return parts.length ? parts.join('\n') : lines.slice(-2).join('\n');
}
