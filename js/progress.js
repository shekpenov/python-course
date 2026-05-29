const KEY = 'python-course-v1-progress';
const XP_KEY = 'python-course-v1-xp';

export const LEVELS = [
  { level: 1, name: 'Новичок',     xp: 0    },
  { level: 2, name: 'Ученик',      xp: 60   },
  { level: 3, name: 'Практик',     xp: 180  },
  { level: 4, name: 'Программист', xp: 360  },
  { level: 5, name: 'Эксперт',     xp: 600  },
  { level: 6, name: 'Мастер',      xp: 900  },
  { level: 7, name: 'Гуру',        xp: 1350 },
];

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}
function save(data) { localStorage.setItem(KEY, JSON.stringify(data)); }

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

// ── XP ──────────────────────────────────────────
export function getTotalXP() {
  return parseInt(localStorage.getItem(XP_KEY) || '0');
}

export function addXP(amount) {
  const before = getLevelInfo().current.level;
  const newXP = getTotalXP() + amount;
  localStorage.setItem(XP_KEY, String(newXP));
  const after = getLevelInfo().current.level;
  return { newXP, levelUp: after > before, newLevel: after };
}

export function getLevelInfo() {
  const xp = getTotalXP();
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xp) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null;
    }
  }
  const xpInLevel = xp - current.xp;
  const xpNeeded = next ? next.xp - current.xp : 1;
  const pct = next ? Math.min(100, Math.round(xpInLevel / xpNeeded * 100)) : 100;
  return { current, next, xp, xpInLevel, xpNeeded, pct };
}

export function getRequiredLevel(topicId) {
  const map = {
    'topic-basics':  1, 'topic-7321': 1,
    'topic-7332':    2, 'topic-7333': 2, 'topic-7331': 2, 'topic-8332': 2,
    'topic-8333':    3, 'topic-8321': 3, 'topic-9331b': 3, 'topic-9331a': 3,
    'topic-9321':    4, 'topic-9332': 4,
    'topic-10511':   5, 'topic-10512': 5,
  };
  return map[topicId] || 1;
}

export function isTopicUnlocked(topicId) {
  return getLevelInfo().current.level >= getRequiredLevel(topicId);
}

export function resetAllProgress() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(XP_KEY);
}
