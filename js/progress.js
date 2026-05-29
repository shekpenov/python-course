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

export function resetAllProgress() {
  localStorage.removeItem(KEY);
}
