import { getTopicProgress, setTaskPassed, isTaskPassed, getCompletedCount } from './progress.js';
import { runPython } from './pyodide-runner.js';

const TOPICS = [
  { id: 'topic-basics', code: '7.1',     title: 'Основы Python',                            group: 'Основы'     },
  { id: 'topic-7321',  code: '7.3.2.1',  title: 'Ветвящиеся алгоритмы в Python',           group: 'Условия'    },
  { id: 'topic-7332',  code: '7.3.3.2',  title: 'Вложенные условия в Python',               group: 'Условия'    },
  { id: 'topic-7333',  code: '7.3.3.3',  title: 'Составные условия в Python',               group: 'Условия'    },
  { id: 'topic-7331',  code: '7.3.3.1',  title: 'Цикл while в Python',                      group: 'Циклы'      },
  { id: 'topic-8332',  code: '8.3.3.2',  title: 'Цикл for в Python',                        group: 'Циклы'      },
  { id: 'topic-8333',  code: '8.3.3.3',  title: 'Управление циклами: continue, break, else', group: 'Циклы'      },
  { id: 'topic-8321',  code: '8.3.2.1',  title: 'Трассировка алгоритмов',                   group: 'Алгоритмы'  },
  { id: 'topic-9321',  code: '9.3.2.1',  title: 'Алгоритмы сортировки в Python',            group: 'Алгоритмы'  },
  { id: 'topic-9331b', code: '9.3.3.1',  title: 'Программы с одномерными массивами',        group: 'Массивы'    },
  { id: 'topic-9332',  code: '9.3.3.2',  title: 'Программы с двумерными массивами',         group: 'Массивы'    },
  { id: 'topic-9331a', code: '9.3.3.1',  title: 'Чтение и запись файлов в Python',          group: 'Файлы'      },
  // { id: 'topic-10513', code: '10.5.1.3', title: 'Работа с файлами: продвинутый уровень', group: 'Файлы' }, // временно скрыто
  { id: 'topic-10511', code: '10.5.1.1', title: 'Функции и процедуры в Python',             group: 'Функции'    },
  { id: 'topic-10512', code: '10.5.1.2', title: 'Обработка строк с помощью функций',        group: 'Функции'    },
];

const ALL_IDS = TOPICS.map(t => t.id);
const GROUP_ORDER = ['Основы', 'Условия', 'Циклы', 'Алгоритмы', 'Массивы', 'Файлы', 'Функции'];
const GROUP_EMOJI = { 'Основы': '🐍', 'Условия': '🔀', 'Циклы': '🔄', 'Алгоритмы': '🧮', 'Массивы': '📋', 'Файлы': '📁', 'Функции': '⚡' };

let currentTopic = null;

// ──────────────────────── SIDEBAR ────────────────────────
function buildSidebar() {
  const nav = document.getElementById('topic-nav');
  const byGroup = {};
  TOPICS.forEach(t => { (byGroup[t.group] = byGroup[t.group] || []).push(t); });

  GROUP_ORDER.forEach(gName => {
    if (!byGroup[gName]) return;
    const group = document.createElement('div');
    group.className = 'nav-group';

    const items = byGroup[gName].map(buildNavItem).join('');
    group.innerHTML = `
      <div class="nav-group-title" role="button" aria-expanded="true">
        <span>${GROUP_EMOJI[gName]} ${gName}</span>
        <i class="nav-group-chevron">▾</i>
      </div>
      <div class="nav-group-items">${items}</div>`;
    nav.appendChild(group);

    const title = group.querySelector('.nav-group-title');
    const itemsEl = group.querySelector('.nav-group-items');
    itemsEl.style.maxHeight = itemsEl.scrollHeight + 'px';

    title.addEventListener('click', () => {
      const open = itemsEl.style.maxHeight !== '0px';
      itemsEl.style.maxHeight = open ? '0px' : itemsEl.scrollHeight + 'px';
      title.querySelector('.nav-group-chevron').textContent = open ? '▸' : '▾';
      title.setAttribute('aria-expanded', String(!open));
    });
  });

  nav.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => { window.location.hash = el.dataset.topic; });
  });
}

function buildNavItem(topic) {
  const p = getTopicProgress(topic.id);
  const done = p.completed;
  return `
    <div class="nav-item${done ? ' completed' : ''}" data-topic="${topic.id}" role="button">
      <span class="nav-item-check">${done ? '✓' : '○'}</span>
      <div class="nav-item-info">
        <div class="nav-item-code">${topic.code}</div>
        <div class="nav-item-title">${topic.title}</div>
      </div>
    </div>`;
}

function refreshNav() {
  document.querySelectorAll('.nav-item').forEach(el => {
    const p = getTopicProgress(el.dataset.topic);
    el.classList.toggle('completed', p.completed);
    el.querySelector('.nav-item-check').textContent = p.completed ? '✓' : '○';
  });
}

// ──────────────────────── PROGRESS ────────────────────────
function updateProgressUI() {
  const n = getCompletedCount(ALL_IDS);
  document.getElementById('progress-bar').style.width = (n / ALL_IDS.length * 100) + '%';
  document.getElementById('progress-text').textContent = `${n} / ${ALL_IDS.length} тем завершено`;
}

// ──────────────────────── ROUTER ────────────────────────
function router() {
  const id = window.location.hash.slice(1);
  if (id && TOPICS.find(t => t.id === id)) loadTopic(id);
  else showHome();
  updateProgressUI();
}

function showHome() {
  document.getElementById('home-view').hidden = false;
  document.getElementById('topic-view').hidden = true;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
}

// ──────────────────────── TOPIC ────────────────────────
async function loadTopic(topicId) {
  const meta = TOPICS.find(t => t.id === topicId);
  if (!meta) return;

  document.querySelectorAll('.nav-item').forEach(el =>
    el.classList.toggle('active', el.dataset.topic === topicId));

  closeMobileSidebar();
  document.getElementById('home-view').hidden = true;
  document.getElementById('topic-view').hidden = false;
  document.getElementById('topic-code-badge').textContent = meta.code;
  document.getElementById('topic-title').textContent = meta.title;

  document.getElementById('theory-content').innerHTML = '<p style="color:var(--text-muted)">Загрузка...</p>';
  document.getElementById('examples-content').innerHTML = '';
  document.getElementById('practice-content').innerHTML = '';

  window.scrollTo(0, 0);

  try {
    const mod = await import(`/modules/${topicId}.js`);
    currentTopic = mod.default;
    if (currentTopic.layout === 'single') {
      document.getElementById('tab-bar').hidden = true;
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('tab-theory').classList.add('active');
      renderSinglePage(currentTopic);
    } else {
      const hasExamples = currentTopic.examples && currentTopic.examples.length > 0;
      document.getElementById('tab-bar').hidden = false;
      document.querySelector('[data-tab="examples"]').hidden = !hasExamples;
      switchTab('theory');
      renderTheory(currentTopic);
      if (hasExamples) renderExamples(currentTopic);
      renderPractice(currentTopic);
    }
  } catch (err) {
    document.getElementById('theory-content').innerHTML =
      `<p style="color:var(--error)">❌ Ошибка загрузки темы. Запустите приложение через веб-сервер (не через file://).<br><small>${err.message}</small></p>`;
  }
}

// ──────────────────────── TABS ────────────────────────
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + name));
}

// ──────────────────────── THEORY ────────────────────────
function renderTheory(topic) {
  const el = document.getElementById('theory-content');
  el.innerHTML = topic.theory;
  if (window.Prism) Prism.highlightAllUnder(el);
}

// ──────────────────────── EXAMPLES ────────────────────────
function renderExamples(topic) {
  const container = document.getElementById('examples-content');
  container.innerHTML = topic.examples.map((ex, i) => `
    <div class="example-block" id="ex-${i}">
      <div class="example-header">
        <span class="example-title">${ex.title}</span>
        <button class="btn btn-run" data-ex="${i}">▶ Запустить</button>
      </div>
      <div class="example-body">
        <pre class="language-python"><code class="language-python">${esc(ex.code)}</code></pre>
        <div class="example-output" id="ex-out-${i}">
          <div class="example-output-label">Вывод</div>
          <pre id="ex-out-text-${i}"></pre>
        </div>
      </div>
    </div>`).join('');

  if (window.Prism) Prism.highlightAllUnder(container);

  container.querySelectorAll('[data-ex]').forEach(btn => {
    btn.addEventListener('click', () => runExample(+btn.dataset.ex, topic.examples));
  });
}

async function runExample(i, examples) {
  const btn = document.querySelector(`#ex-${i} .btn-run`);
  const outEl = document.getElementById(`ex-out-${i}`);
  const textEl = document.getElementById(`ex-out-text-${i}`);

  btn.disabled = true;
  btn.textContent = '⏳ Выполнение...';

  const { output, error } = await runPython(examples[i].code);

  btn.disabled = false;
  btn.textContent = '▶ Запустить';
  outEl.classList.add('visible');

  if (error) {
    textEl.className = 'is-error';
    textEl.textContent = (output ? output + '\n' : '') + '❌ ' + error;
  } else {
    textEl.className = '';
    textEl.textContent = output || '(нет вывода)';
  }
}

// ──────────────────────── SINGLE PAGE ────────────────────────
function renderSinglePage(topic) {
  const container = document.getElementById('theory-content');

  container.innerHTML = `<div class="practice-warning">⚠️ Вывод программы должен <strong>точно совпадать</strong> с ожидаемым ответом — проверяйте регистр букв, пробелы и знаки препинания.</div>` +
  topic.sections.map((sec, si) => {
    const done = isTaskPassed(topic.id, si);
    return `
      <div class="sp-section" id="sp-sec-${si}">
        <h2 class="sp-heading">${sec.heading}</h2>
        <div class="sp-theory">${sec.content}</div>
        ${sec.example ? `
        <div class="sp-example" id="sp-ex-${si}">
          <div class="sp-example-title">${sec.example.title}</div>
          <div class="sp-example-body">
            <pre><code class="language-python">${esc(sec.example.code)}</code></pre>
            <button class="btn btn-run sp-run-btn" data-sp-ex="${si}">▶ Запустить</button>
            <div class="sp-example-out" id="sp-out-${si}"><pre id="sp-out-text-${si}"></pre></div>
          </div>
        </div>` : ''}
        ${sec.task ? `
        <div class="sp-task${done ? ' task-done' : ''}" id="sp-task-${si}">
          <div class="sp-task-label">✏️ Практика</div>
          <div class="sp-task-prompt">${sec.task.prompt}</div>
          <textarea class="code-editor" id="sp-editor-${si}" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">${esc(sec.task.starterCode)}</textarea>
          <div class="task-actions">
            <button class="btn btn-run" data-sp-run="${si}">▶ Запустить</button>
            <button class="btn btn-check" data-sp-check="${si}">✓ Проверить</button>
            <button class="btn btn-hint" data-sp-hint="${si}">💡 Подсказка</button>
          </div>
          <div class="task-output" id="sp-taskout-${si}">
            <div class="task-output-header">Вывод программы</div>
            <div class="task-output-body"><pre id="sp-taskout-text-${si}"></pre></div>
          </div>
          <div class="task-result" id="sp-result-${si}"></div>
          <div class="task-hint" id="sp-hint-${si}">
            <div class="task-hint-label">💡 Подсказка</div>
            <div class="task-hint-text">${sec.task.hint}</div>
          </div>
          <div class="task-solution" id="sp-solution-${si}"${done ? '' : ' hidden'}>
            <div class="task-solution-label">✅ Один из вариантов решения</div>
            <pre><code class="language-python">${esc(sec.task.solution)}</code></pre>
          </div>
          <div class="sp-task-footer">
            <div class="completion-dot${done ? ' done' : ''}" id="sp-dot-${si}"></div>
            <span id="sp-dot-label-${si}">${done ? 'Выполнено ✓' : 'Не выполнено'}</span>
          </div>
        </div>` : ''}
      </div>`;
  }).join('');

  if (window.Prism) Prism.highlightAllUnder(container);

  container.querySelectorAll('.code-editor').forEach(ta => {
    ta.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart, end = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(end);
        ta.selectionStart = ta.selectionEnd = s + 4;
      }
    });
  });

  container.querySelectorAll('[data-sp-ex]').forEach(btn =>
    btn.addEventListener('click', () => runSpExample(+btn.dataset.spEx, topic.sections)));
  container.querySelectorAll('[data-sp-run]').forEach(btn =>
    btn.addEventListener('click', () => runSpTask(+btn.dataset.spRun)));
  container.querySelectorAll('[data-sp-check]').forEach(btn =>
    btn.addEventListener('click', () => checkSpTask(+btn.dataset.spCheck)));
  container.querySelectorAll('[data-sp-hint]').forEach(btn =>
    btn.addEventListener('click', () => document.getElementById(`sp-hint-${btn.dataset.spHint}`).classList.toggle('visible')));
}

async function runSpExample(si, sections) {
  const btn = document.querySelector(`[data-sp-ex="${si}"]`);
  const outEl = document.getElementById(`sp-out-${si}`);
  const textEl = document.getElementById(`sp-out-text-${si}`);
  btn.disabled = true; btn.textContent = '⏳ Выполнение...';
  const { output, error } = await runPython(sections[si].example.code);
  btn.disabled = false; btn.textContent = '▶ Запустить';
  outEl.classList.add('visible');
  if (error) { textEl.className = 'is-error'; textEl.textContent = (output ? output + '\n' : '') + '❌ ' + error; }
  else { textEl.className = ''; textEl.textContent = output || '(нет вывода)'; }
}

async function runSpTask(si) {
  const btn = document.querySelector(`[data-sp-run="${si}"]`);
  btn.disabled = true; btn.textContent = '⏳...';
  const { output, error } = await runPython(document.getElementById(`sp-editor-${si}`).value);
  btn.disabled = false; btn.textContent = '▶ Запустить';
  showSpOutput(si, output, error);
}

async function checkSpTask(si) {
  const task = currentTopic.sections[si].task;
  const btn = document.querySelector(`[data-sp-check="${si}"]`);
  btn.disabled = true; btn.textContent = '⏳...';
  const code = document.getElementById(`sp-editor-${si}`).value;
  const { output, error } = await runPython(code);
  btn.disabled = false; btn.textContent = '✓ Проверить';
  showSpOutput(si, output, error);

  const resultEl = document.getElementById(`sp-result-${si}`);
  if (error) {
    resultEl.className = 'task-result visible is-failure';
    resultEl.textContent = '❌ Ошибка выполнения. Исправьте код и попробуйте снова.';
    return;
  }
  let passed = false;
  try { passed = task.test(output, code); } catch {}
  resultEl.className = `task-result visible ${passed ? 'is-success' : 'is-failure'}`;
  resultEl.textContent = passed ? '✅ Правильно! Задание выполнено.' : '❌ Неверный ответ. Проверьте вывод и попробуйте снова.';
  if (passed) {
    document.getElementById(`sp-dot-${si}`).className = 'completion-dot done';
    document.getElementById(`sp-dot-label-${si}`).textContent = 'Выполнено ✓';
    document.getElementById(`sp-task-${si}`).classList.add('task-done');
    setTaskPassed(currentTopic.id, si, currentTopic.sections.length);
    updateProgressUI();
    refreshNav();
    const solEl = document.getElementById(`sp-solution-${si}`);
    if (solEl) { solEl.hidden = false; if (window.Prism) Prism.highlightAllUnder(solEl); }
  }
}

function showSpOutput(si, output, error) {
  const outEl = document.getElementById(`sp-taskout-${si}`);
  const textEl = document.getElementById(`sp-taskout-text-${si}`);
  outEl.classList.add('visible');
  if (error) { textEl.className = 'is-error'; textEl.textContent = (output ? output + '\n' : '') + '❌ ' + error; }
  else { textEl.className = ''; textEl.textContent = output || '(нет вывода)'; }
}

// ──────────────────────── PRACTICE ────────────────────────
function renderPractice(topic) {
  const container = document.getElementById('practice-content');
  container.innerHTML = `<div class="practice-warning">⚠️ Вывод программы должен <strong>точно совпадать</strong> с ожидаемым ответом — проверяйте регистр букв, пробелы и знаки препинания.</div>` +
  topic.tasks.map((task, i) => {
    const done = isTaskPassed(topic.id, i);
    return `
      <div class="task-block${done ? ' task-done' : ''}" id="task-${i}">
        <div class="task-header">
          <div class="task-number">${i + 1}</div>
          <div class="task-prompt">${task.prompt}</div>
        </div>
        <div class="task-body">
          <textarea class="code-editor" id="editor-${i}" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">${esc(task.starterCode)}</textarea>
          <div class="task-actions">
            <button class="btn btn-run" data-task-run="${i}">▶ Запустить</button>
            <button class="btn btn-check" data-task-check="${i}">✓ Проверить</button>
            <button class="btn btn-hint" data-task-hint="${i}">💡 Подсказка</button>
          </div>
          <div class="task-output" id="out-${i}">
            <div class="task-output-header">Вывод программы</div>
            <div class="task-output-body"><pre id="out-text-${i}"></pre></div>
          </div>
          <div class="task-result" id="result-${i}"></div>
          <div class="task-hint" id="hint-${i}">
            <div class="task-hint-label">💡 Подсказка</div>
            <div class="task-hint-text">${task.hint}</div>
          </div>
          <div class="task-solution" id="solution-${i}"${done ? '' : ' hidden'}>
            <div class="task-solution-label">✅ Один из вариантов решения</div>
            <pre><code class="language-python">${esc(task.solution)}</code></pre>
          </div>
        </div>
        <div class="task-footer">
          <div class="completion-dot${done ? ' done' : ''}" id="dot-${i}"></div>
          <span class="completion-label" id="dot-label-${i}">${done ? 'Выполнено ✓' : 'Не выполнено'}</span>
        </div>
      </div>`;
  }).join('');

  if (window.Prism) Prism.highlightAllUnder(container);

  container.querySelectorAll('.code-editor').forEach(ta => {
    ta.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart, end = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(end);
        ta.selectionStart = ta.selectionEnd = s + 4;
      }
    });
  });

  container.querySelectorAll('[data-task-run]').forEach(btn =>
    btn.addEventListener('click', () => execTaskRun(+btn.dataset.taskRun)));
  container.querySelectorAll('[data-task-check]').forEach(btn =>
    btn.addEventListener('click', () => execTaskCheck(+btn.dataset.taskCheck)));
  container.querySelectorAll('[data-task-hint]').forEach(btn =>
    btn.addEventListener('click', () => toggleHint(+btn.dataset.taskHint)));
}

async function execTaskRun(i) {
  const btn = document.querySelector(`[data-task-run="${i}"]`);
  btn.disabled = true; btn.textContent = '⏳...';
  const { output, error } = await runPython(document.getElementById(`editor-${i}`).value);
  btn.disabled = false; btn.textContent = '▶ Запустить';
  showOutput(i, output, error);
}

async function execTaskCheck(i) {
  const task = currentTopic.tasks[i];
  const btn = document.querySelector(`[data-task-check="${i}"]`);
  btn.disabled = true; btn.textContent = '⏳...';
  const code = document.getElementById(`editor-${i}`).value;
  const { output, error } = await runPython(code);
  btn.disabled = false; btn.textContent = '✓ Проверить';

  showOutput(i, output, error);

  const resultEl = document.getElementById(`result-${i}`);
  if (error) {
    resultEl.className = 'task-result visible is-failure';
    resultEl.textContent = '❌ Ошибка выполнения. Исправьте код и попробуйте снова.';
    return;
  }

  let passed = false;
  try { passed = task.test(output, code); } catch {}

  resultEl.className = `task-result visible ${passed ? 'is-success' : 'is-failure'}`;
  resultEl.textContent = passed ? '✅ Правильно! Задание выполнено.' : '❌ Неверный ответ. Проверьте вывод и попробуйте снова.';

  if (passed) {
    document.getElementById(`dot-${i}`).className = 'completion-dot done';
    document.getElementById(`dot-label-${i}`).textContent = 'Выполнено ✓';
    document.getElementById(`task-${i}`).classList.add('task-done');
    setTaskPassed(currentTopic.id, i, currentTopic.tasks.length);
    updateProgressUI();
    refreshNav();
    showSolution(i);
  }
}

function showSolution(i) {
  const el = document.getElementById(`solution-${i}`);
  if (el) {
    el.hidden = false;
    if (window.Prism) Prism.highlightAllUnder(el);
  }
}

function showOutput(i, output, error) {
  const outEl = document.getElementById(`out-${i}`);
  const textEl = document.getElementById(`out-text-${i}`);
  outEl.classList.add('visible');
  if (error) {
    textEl.className = 'is-error';
    textEl.textContent = (output ? output + '\n' : '') + '❌ ' + error;
  } else {
    textEl.className = '';
    textEl.textContent = output || '(нет вывода)';
  }
}

function toggleHint(i) {
  document.getElementById(`hint-${i}`).classList.toggle('visible');
}

// ──────────────────────── MOBILE ────────────────────────
function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('visible');
}

// ──────────────────────── UTIL ────────────────────────
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ──────────────────────── INIT ────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  updateProgressUI();

  document.querySelectorAll('.tab-btn').forEach(btn =>
    btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
  });
  overlay.addEventListener('click', closeMobileSidebar);

  window.addEventListener('hashchange', router);
  router();
});
