const path = require('path');
const { readFileSync } = require('fs');

const DATA_PATH = path.join(__dirname, '..', 'data', 'restaurants.json');

let store = [];
let nextId = 1;

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function loadSeed() {
  try {
    const raw = readFileSync(DATA_PATH, 'utf8');
    const json = JSON.parse(raw);
    return Array.isArray(json) ? json : [];
  } catch (e) {
    return [];
  }
}

async function resetStore() {
  const seed = loadSeed();
  store = seed.map((item, idx) => ({
    id: item.id ?? idx + 1,
    name: item.name,
    category: item.category || item.type || '기타',
    location: item.location || item.address || '',
    rating: typeof item.rating === 'number' ? item.rating : 0,
  }));
  nextId = store.reduce((m, it) => Math.max(m, Number(it.id) || 0), 0) + 1;
}

function getAllRestaurantsSync() {
  return deepClone(store);
}

async function getAllRestaurants() {
  return getAllRestaurantsSync();
}

async function getRestaurantById(id) {
  const targetId = Number(id);
  const found = store.find((it) => Number(it.id) === targetId) || null;
  return deepClone(found);
}

async function getPopularRestaurants(limit = 5) {
  const sorted = [...store].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  return deepClone(sorted.slice(0, limit));
}

async function createRestaurant(payload) {
  const required = ['name', 'category', 'location'];
  const missing = required.find((k) => !payload || !payload[k]);
  if (missing) {
    const err = new Error(`'${missing}' is required`);
    err.status = 400;
    throw err;
  }

  const created = {
    id: nextId++,
    name: payload.name,
    category: payload.category,
    location: payload.location,
    rating: typeof payload.rating === 'number' ? payload.rating : 0,
  };
  store.push(created);
  return deepClone(created);
}

async function updateRestaurant(id, payload) {
  const targetId = Number(id);
  const idx = store.findIndex((it) => Number(it.id) === targetId);
  if (idx === -1) return null;
  store[idx] = { ...store[idx], ...payload, id: targetId };
  return deepClone(store[idx]);
}

async function deleteRestaurant(id) {
  const targetId = Number(id);
  const idx = store.findIndex((it) => Number(it.id) === targetId);
  if (idx === -1) return null;
  const [removed] = store.splice(idx, 1);
  return deepClone(removed);
}

async function ensureSeededOnce() {
  if (store.length === 0) await resetStore();
  return { seeded: true, count: store.length };
}

module.exports = {
  getAllRestaurants,
  getAllRestaurantsSync,
  getRestaurantById,
  getPopularRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  resetStore,
  ensureSeededOnce,
};
