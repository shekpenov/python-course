/**
 * profile.js — Модуль профиля ученика
 * Хранит: имя, аватар, XP, уровень, ачивки, стрик, статистику
 * Всё в localStorage, без бэкенда.
 */

// ─────────────────────────────────────────────
// КОНСТАНТЫ
// ─────────────────────────────────────────────

const PROFILE_KEY   = 'pyc-profile-v1';
const OLD_XP_KEY    = 'python-course-v1-xp';   // миграция из старой системы

/** Уровни по заданию учителя */
export const LEVELS = [
  { level: 1, name: 'Новичок',     min: 0,    max: 99   },
  { level: 2, name: 'Ученик',      min: 100,  max: 249  },
  { level: 3, name: 'Кодер',       min: 250,  max: 499  },
  { level: 4, name: 'Разработчик', min: 500,  max: 999  },
  { level: 5, name: 'Питонист',    min: 1000, max: 1999 },
  { level: 6, name: 'Гуру Python', min: 2000, max: Infinity },
];

/** Начисление XP по событиям */
export const XP_REWARDS = {
  TOPIC_VIEW:       10,   // первый просмотр темы
  EXAMPLE_RUN:       5,   // запуск примера кода
  TASK_COMPLETE:    30,   // выполненное задание
  DAILY_STREAK:     15,   // ежедневный вход
  FIRST_CODE_RUN:   20,   // самый первый запуск кода (разово)
};

/** Определения всех ачивок */
export const ACHIEVEMENTS = {
  first_step: {
    id: 'first_step', icon: '🥇',
    name: 'Первый шаг',
    desc: 'Завершить первую тему',
  },
  on_fire: {
    id: 'on_fire', icon: '🔥',
    name: 'На огне',
    desc: '3 дня подряд',
  },
  perfectionist: {
    id: 'perfectionist', icon: '💯',
    name: 'Перфекционист',
    desc: 'Выполнить задание с первой попытки',
  },
  rocket: {
    id: 'rocket', icon: '🚀',
    name: 'Ракета',
    desc: 'Завершить 5 тем за один день',
  },
  pythonist: {
    id: 'pythonist', icon: '🐍',
    name: 'Питонист',
    desc: 'Завершить все 14 тем',
  },
  speedrunner: {
    id: 'speedrunner', icon: '⚡',
    name: 'Спидраннер',
    desc: 'Выполнить задание менее чем за 60 секунд',
  },
  night_owl: {
    id: 'night_owl', icon: '🌙',
    name: 'Сова',
    desc: 'Заниматься после 22:00',
  },
  sniper: {
    id: 'sniper', icon: '🎯',
    name: 'Снайпер',
    desc: '5 заданий подряд без ошибок',
  },
};

// ─────────────────────────────────────────────
// ХРАНИЛИЩЕ
// ─────────────────────────────────────────────

/** Прочитать профиль из localStorage */
function _load() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)) || null;
  } catch { return null; }
}

/** Сохранить профиль в localStorage */
function _save(data) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
}

/** Создать профиль по умолчанию */
function _createDefault(username = '', avatar = '🐍') {
  const today = _today();
  // Миграция XP из старой системы
  const oldXP = parseInt(localStorage.getItem(OLD_XP_KEY) || '0');

  return {
    username,
    avatar,
    registeredAt: new Date().toISOString(),
    lastVisit: new Date().toISOString(),
    streak: 1,
    streakLastDate: today,
    xp: oldXP,
    level: _calcLevel(oldXP),
    achievements: [],
    topicsViewed: [],          // id тем, которые уже просмотрены (для XP за просмотр)
    stats: {
      topicsCompleted: 0,
      tasksCompleted: 0,
      tasksToday: 0,
      tasksTodayDate: today,
      topicsCompletedToday: 0,
      topicsCompletedTodayDate: today,
      codeRuns: 0,
      firstCodeRunDone: false,
      consecutiveCorrect: 0,   // для ачивки «Снайпер»
      taskStartTime: 0,        // для ачивки «Спидраннер»
    },
  };
}

/** Получить текущую дату в формате YYYY-MM-DD */
function _today() {
  return new Date().toISOString().split('T')[0];
}

/** Вычислить уровень по XP */
function _calcLevel(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) return LEVELS[i].level;
  }
  return 1;
}

// ─────────────────────────────────────────────
// ПУБЛИЧНЫЙ API
// ─────────────────────────────────────────────

/** Получить профиль (или null если не создан) */
export function getProfile() { return _load(); }

/** Профиль уже существует? */
export function hasProfile() { return _load() !== null; }

/**
 * Инициализация при загрузке страницы.
 * Если профиля нет — показывает модальное окно создания.
 * Если есть — обновляет стрик и UI.
 */
export function init() {
  if (!hasProfile()) {
    _showSetupModal();
    return;
  }
  _checkStreak();
  _checkNightOwl();
  updateMiniCard();
}

// ─────────────────────────────────────────────
// XP И УРОВНИ
// ─────────────────────────────────────────────

/**
 * Начислить XP.
 * @param {number} amount - количество XP
 * @param {string} [reason] - описание причины (для отладки)
 * @returns {{ newXP: number, levelUp: boolean, newLevel: number }}
 */
export function addXP(amount, reason = '') {
  const p = _load();
  if (!p) return { newXP: 0, levelUp: false, newLevel: 1 };

  const oldLevel = p.level;
  p.xp += amount;
  p.level = _calcLevel(p.xp);
  _save(p);

  const levelUp = p.level > oldLevel;
  if (levelUp) {
    const lvlDef = LEVELS.find(l => l.level === p.level);
    _showLevelUpAnimation(p.level, lvlDef?.name || '');
  }

  updateMiniCard();
  return { newXP: p.xp, levelUp, newLevel: p.level };
}

/** Получить информацию об уровне для профиля */
export function getLevelInfo() {
  const p = _load();
  const xp = p?.xp || 0;
  const level = _calcLevel(xp);
  const lvlDef  = LEVELS.find(l => l.level === level);
  const nextDef = LEVELS.find(l => l.level === level + 1);
  const xpInLevel = xp - lvlDef.min;
  const xpNeeded  = nextDef ? nextDef.min - lvlDef.min : 1;
  const pct = nextDef ? Math.min(100, Math.round(xpInLevel / xpNeeded * 100)) : 100;
  return { level, name: lvlDef.name, xp, xpInLevel, xpNeeded, pct, nextName: nextDef?.name };
}

// ─────────────────────────────────────────────
// СТРИК
// ─────────────────────────────────────────────

function _checkStreak() {
  const p = _load();
  if (!p) return;
  const today = _today();
  if (p.streakLastDate === today) return; // уже засчитан сегодня

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().split('T')[0];

  if (p.streakLastDate === yStr) {
    // Вчера заходил — продолжаем стрик
    p.streak += 1;
    addXP(XP_REWARDS.DAILY_STREAK, 'streak');
  } else {
    // Пропустил день — сбрасываем
    p.streak = 1;
  }

  p.streakLastDate = today;
  p.lastVisit = new Date().toISOString();
  _save(p);

  // Ачивка «На огне» — 3 дня подряд
  if (p.streak >= 3) unlockAchievement('on_fire');
}

// ─────────────────────────────────────────────
// СТАТИСТИКА И СОБЫТИЯ
// ─────────────────────────────────────────────

/**
 * Зафиксировать просмотр темы (только первый раз начисляем XP).
 * @param {string} topicId
 */
export function recordTopicView(topicId) {
  const p = _load();
  if (!p) return;
  if (p.topicsViewed.includes(topicId)) return; // уже смотрел
  p.topicsViewed.push(topicId);
  _save(p);
  addXP(XP_REWARDS.TOPIC_VIEW, 'topic_view');
}

/**
 * Зафиксировать запуск кода в примере.
 */
export function recordExampleRun() {
  const p = _load();
  if (!p) return;

  // Разовый бонус за самый первый запуск кода
  if (!p.stats.firstCodeRunDone) {
    p.stats.firstCodeRunDone = true;
    _save(p);
    addXP(XP_REWARDS.FIRST_CODE_RUN, 'first_code_run');
    _showXPToast(XP_REWARDS.FIRST_CODE_RUN, '🎉 Первый запуск кода!');
  }

  p.stats.codeRuns++;
  _save(p);
  addXP(XP_REWARDS.EXAMPLE_RUN, 'example_run');
}

/**
 * Зафиксировать начало работы над заданием (для таймера Спидраннера).
 */
export function recordTaskStart() {
  const p = _load();
  if (!p) return;
  p.stats.taskStartTime = Date.now();
  _save(p);
}

/**
 * Зафиксировать выполнение задания.
 * @param {boolean} isFirstAttempt - пользователь решил с первой попытки?
 * @param {number} completedTopicsTotal - сколько тем завершено всего (для ачивок)
 */
export function recordTaskCompleted(isFirstAttempt, completedTopicsTotal = 0) {
  const p = _load();
  if (!p) return;

  const today = _today();
  p.stats.tasksCompleted++;

  // Счётчик заданий сегодня (для ачивки Ракета)
  if (p.stats.tasksTodayDate !== today) {
    p.stats.tasksToday = 0;
    p.stats.tasksTodayDate = today;
  }
  p.stats.tasksToday++;

  // Подряд без ошибок (для Снайпера)
  if (isFirstAttempt) {
    p.stats.consecutiveCorrect++;
  } else {
    p.stats.consecutiveCorrect = 0;
  }

  _save(p);

  // Начислить XP за задание
  const { levelUp, newLevel } = addXP(XP_REWARDS.TASK_COMPLETE, 'task');

  // Проверить ачивки
  if (isFirstAttempt) unlockAchievement('perfectionist');
  if (p.stats.consecutiveCorrect >= 5) unlockAchievement('sniper');

  // Спидраннер: время < 60 секунд
  if (p.stats.taskStartTime > 0) {
    const elapsed = (Date.now() - p.stats.taskStartTime) / 1000;
    if (elapsed < 60) unlockAchievement('speedrunner');
    p.stats.taskStartTime = 0;
    _save(p);
  }

  // Питонист: все 14 тем
  if (completedTopicsTotal >= 14) unlockAchievement('pythonist');

  return { levelUp, newLevel };
}

/**
 * Зафиксировать завершение темы.
 * @param {number} completedTotal - всего завершено тем
 */
export function recordTopicCompleted(completedTotal) {
  const p = _load();
  if (!p) return;
  const today = _today();

  p.stats.topicsCompleted = completedTotal;

  // Счётчик тем за день (для Ракеты)
  if (p.stats.topicsCompletedTodayDate !== today) {
    p.stats.topicsCompletedToday = 0;
    p.stats.topicsCompletedTodayDate = today;
  }
  p.stats.topicsCompletedToday++;
  _save(p);

  // Первая тема
  if (completedTotal === 1) unlockAchievement('first_step');
  // 5 тем за день
  if (p.stats.topicsCompletedToday >= 5) unlockAchievement('rocket');
  // Все 14 тем
  if (completedTotal >= 14) unlockAchievement('pythonist');
}

// ─────────────────────────────────────────────
// АЧИВКИ
// ─────────────────────────────────────────────

/** Разблокировать ачивку (если ещё не получена). */
export function unlockAchievement(id) {
  const p = _load();
  if (!p || p.achievements.includes(id)) return; // уже есть

  p.achievements.push(id);
  _save(p);

  const def = ACHIEVEMENTS[id];
  if (def) _showAchievementToast(def);
}

/** Получена ли ачивка? */
export function isAchievementUnlocked(id) {
  const p = _load();
  return p?.achievements.includes(id) || false;
}

// ─────────────────────────────────────────────
// НАСТРОЙКИ ПРОФИЛЯ
// ─────────────────────────────────────────────

/** Сохранить изменения имени и аватара. */
export function updateProfile(username, avatar) {
  const p = _load() || _createDefault();
  p.username = username.trim() || p.username;
  p.avatar = avatar || p.avatar;
  _save(p);
  updateMiniCard();
}

/** Ночная сова: занимается после 22:00 */
function _checkNightOwl() {
  if (new Date().getHours() >= 22) unlockAchievement('night_owl');
}

// ─────────────────────────────────────────────
// UI: МИНИ-КАРТОЧКА В САЙДБАРЕ
// ─────────────────────────────────────────────

/** Обновить мини-карточку профиля в сайдбаре. */
export function updateMiniCard() {
  const p = _load();
  const info = getLevelInfo();

  const avatarEl   = document.getElementById('mini-avatar');
  const nameEl     = document.getElementById('mini-username');
  const levelEl    = document.getElementById('mini-level-text');
  const fillEl     = document.getElementById('mini-xp-fill');
  const xpLabelEl  = document.getElementById('mini-xp-label');

  if (avatarEl)   avatarEl.textContent   = p?.avatar || '🐍';
  if (nameEl)     nameEl.textContent     = p?.username || 'Ученик';
  if (levelEl)    levelEl.textContent    = `Ур.${info.level} · ${info.name}`;
  if (fillEl)     fillEl.style.width     = info.pct + '%';
  if (xpLabelEl)  xpLabelEl.textContent  = info.nextName
    ? `${info.xpInLevel} / ${info.xpNeeded} XP`
    : 'MAX';
}

// ─────────────────────────────────────────────
// UI: УВЕДОМЛЕНИЕ О ДОСТИЖЕНИИ
// ─────────────────────────────────────────────

function _showAchievementToast(achievement) {
  const toast = document.getElementById('achievement-toast');
  if (!toast) return;

  toast.querySelector('.toast-icon').textContent = achievement.icon;
  toast.querySelector('.toast-name').textContent = achievement.name;
  toast.querySelector('.toast-desc').textContent = achievement.desc;

  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 4000);
}

// ─────────────────────────────────────────────
// UI: УВЕДОМЛЕНИЕ О XP (без ачивки)
// ─────────────────────────────────────────────

function _showXPToast(amount, label = '') {
  const el = document.createElement('div');
  el.className = 'xp-popup';
  el.textContent = label || `+${amount} XP`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('visible'));
  setTimeout(() => {
    el.classList.remove('visible');
    setTimeout(() => el.remove(), 400);
  }, 2500);
}

// ─────────────────────────────────────────────
// UI: АНИМАЦИЯ ПОВЫШЕНИЯ УРОВНЯ
// ─────────────────────────────────────────────

function _showLevelUpAnimation(level, levelName) {
  const overlay = document.getElementById('levelup-overlay');
  if (!overlay) return;

  overlay.querySelector('.levelup-new').textContent  = `Уровень ${level}: ${levelName}`;
  overlay.hidden = false;
  overlay.classList.add('active');
}

export function hideLevelUp() {
  const overlay = document.getElementById('levelup-overlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  setTimeout(() => { overlay.hidden = true; }, 400);
}

// ─────────────────────────────────────────────
// UI: МОДАЛЬНОЕ ОКНО СОЗДАНИЯ ПРОФИЛЯ
// ─────────────────────────────────────────────

const AVATARS = ['🐍', '🤖', '🦊', '🐼', '🦁', '🐧'];
let _selectedAvatar = '🐍';

function _showSetupModal() {
  const modal = document.getElementById('profile-setup-modal');
  if (!modal) return;
  modal.hidden = false;

  // Нарисовать кнопки аватаров
  const grid = modal.querySelector('.avatar-grid');
  if (grid) {
    grid.innerHTML = AVATARS.map(a => `
      <button class="avatar-btn${a === _selectedAvatar ? ' selected' : ''}"
              data-avatar="${a}" onclick="Profile._selectAvatar('${a}')">${a}</button>
    `).join('');
  }
}

export function _selectAvatar(emoji) {
  _selectedAvatar = emoji;
  document.querySelectorAll('.avatar-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.avatar === emoji);
  });
}

/** Сохранить профиль из модального окна */
export function saveSetup() {
  const input = document.getElementById('setup-name-input');
  const name  = (input?.value || '').trim();
  if (!name) {
    if (input) {
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 500);
    }
    return;
  }

  const newProfile = _createDefault(name, _selectedAvatar);
  _save(newProfile);

  const modal = document.getElementById('profile-setup-modal');
  if (modal) modal.hidden = true;

  _checkNightOwl();
  updateMiniCard();

  // Удалить старый XP-ключ (уже мигрирован в профиль)
  localStorage.removeItem(OLD_XP_KEY);
}

// Экспортировать объект для вызова из HTML (onclick="Profile.xxx()")
// Нужно сделать доступным глобально
if (typeof window !== 'undefined') {
  window.Profile = {
    init, addXP, getLevelInfo,
    recordTopicView, recordExampleRun, recordTaskStart,
    recordTaskCompleted, recordTopicCompleted,
    unlockAchievement, isAchievementUnlocked,
    updateMiniCard, updateProfile, hideLevelUp,
    saveSetup, _selectAvatar,
    getProfile, hasProfile, ACHIEVEMENTS, LEVELS,
  };
}
