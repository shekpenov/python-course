/**
 * progress.js — Отслеживание прохождения тем и заданий.
 * XP и уровни перенесены в profile.js.
 */

const KEY = 'python-course-v1-progress';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getTopicProgress(topicId) {
  const data = load();
  return data[topicId] || { completed: false, passedTasks: [] };
}

export function setTaskPassed(topicId, taskIndex, totalTasks) {
  const data = load();
  if (!data[topicId]) data[topicId] = { completed: false, passedTasks: [] };
  const p = data[topicId];
  if (!p.passedTasks.includes(taskIndex)) p.passedTasks.push(taskIndex);
  if (p.passedTasks.length >= totalTasks) p.completed = true;
  save(data);
  return p;
}

export function isTaskPassed(topicId, taskIndex) {
  return getTopicProgress(topicId).passedTasks.includes(taskIndex);
}

export function getCompletedCount(topicIds) {
  const data = load();
  return topicIds.filter(id => data[id]?.completed).length;
}

/** Уровень, необходимый для открытия темы */
export function getRequiredLevel(topicId) {
  const map = {
    'topic-basics': 1, 'topic-7321': 1,
    'topic-7332': 2,   'topic-7333': 2,  'topic-7331': 2,  'topic-8332': 2,
    'topic-8333': 3,   'topic-8321': 3,  'topic-9331b': 3, 'topic-9331a': 3,
    'topic-9321': 4,   'topic-9332': 4,
    'topic-10511': 5,  'topic-10512': 5,
  };
  return map[topicId] || 1;
}

/** Доступна ли тема ученику (проверяет уровень из profile.js)? */
export function isTopicUnlocked(topicId) {
  try {
    // Используем профиль из profile.js (хранится в localStorage)
    const raw = localStorage.getItem('pyc-profile-v1');
    const profile = raw ? JSON.parse(raw) : null;
    const currentLevel = profile?.level || 1;
    return currentLevel >= getRequiredLevel(topicId);
  } catch {
    return true; // при ошибке открываем всё
  }
}

export function resetAllProgress() {
  localStorage.removeItem(KEY);
}
