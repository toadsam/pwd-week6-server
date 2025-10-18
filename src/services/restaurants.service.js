const Restaurant = require('../models/restaurant.model');
const mongoose = require('mongoose');
const path = require('path');
const { readFileSync } = require('fs');

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// DB readiness helper
function usingDb() {
  return mongoose.connection && mongoose.connection.readyState === 1; // connected
}

// In-memory store for test/dev without DB
const DATA_PATH = path.join(__dirname, '..', 'data', 'restaurants.json');
let memStore = [];
let nextId = 1;

function loadSeed() {
  try {
    const raw = readFileSync(DATA_PATH, 'utf8');
    const json = JSON.parse(raw);
    return Array.isArray(json) ? json : [];
  } catch (_e) {
    return [];
  }
}

function normaliseSeed(items) {
  return items.map((item, idx) => ({
    id: Number(item.id ?? idx + 1),
    name: item.name,
    category: item.category || item.type || '',
    location: item.location || item.address || '',
    rating: typeof item.rating === 'number' ? item.rating : 0,
    priceRange: item.priceRange,
    description: item.description || '',
    recommendedMenu: Array.isArray(item.recommendedMenu) ? item.recommendedMenu : [],
    likes: typeof item.likes === 'number' ? item.likes : 0,
    image: item.image || '',
  }));
}

// Lightweight cache to support getAllRestaurantsSync compatibility in DB mode
let cachedAll = null;

async function resetStore() {
  if (usingDb()) {
    cachedAll = null;
    const count = await Restaurant.estimatedDocumentCount();
    return { count };
  }

  const seed = normaliseSeed(loadSeed());
  memStore = seed;
  nextId = memStore.reduce((m, it) => Math.max(m, Number(it.id) || 0), 0) + 1;
  return { count: memStore.length };
}

function getAllRestaurantsSync() {
  if (usingDb()) return deepClone(cachedAll ?? []);
  return deepClone(memStore);
}

async function getAllRestaurants() {
  if (usingDb()) {
    const docs = await Restaurant.find().select('-_id').lean();
    cachedAll = docs;
    return deepClone(docs);
  }
  return deepClone(memStore);
}

async function getRestaurantById(id) {
  const targetId = Number(id);
  if (usingDb()) {
    const doc = await Restaurant.findOne({ id: targetId }).select('-_id').lean();
    return doc ? deepClone(doc) : null;
  }
  const found = memStore.find((it) => Number(it.id) === targetId) || null;
  return deepClone(found);
}

async function getPopularRestaurants(limit = 5) {
  const lim = Number(limit) || 5;
  if (usingDb()) {
    const docs = await Restaurant.find()
      .sort({ rating: -1 })
      .limit(lim)
      .select('-_id')
      .lean();
    return deepClone(docs);
  }
  const sorted = [...memStore].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  return deepClone(sorted.slice(0, lim));
}

async function createRestaurant(payload) {
  const required = ['name', 'category', 'location'];
  const missing = required.find((k) => !payload || !payload[k]);
  if (missing) {
    const err = new Error(`'${missing}' is required`);
    err.status = 400;
    throw err;
  }

  if (usingDb()) {
    const last = await Restaurant.findOne().sort({ id: -1 }).select('id').lean();
    const newId = ((last && Number(last.id)) || 0) + 1;
    const doc = await Restaurant.create({
      id: newId,
      name: payload.name,
      category: payload.category,
      location: payload.location,
      priceRange: payload.priceRange,
      rating: typeof payload.rating === 'number' ? payload.rating : 0,
      description: payload.description,
      recommendedMenu: Array.isArray(payload.recommendedMenu)
        ? payload.recommendedMenu
        : [],
      likes: typeof payload.likes === 'number' ? payload.likes : 0,
      image: payload.image || '',
    });
    const created = await Restaurant.findOne({ _id: doc._id }).select('-_id').lean();
    if (cachedAll) cachedAll.push(created);
    return deepClone(created);
  }

  const created = {
    id: nextId++,
    name: payload.name,
    category: payload.category,
    location: payload.location,
    rating: typeof payload.rating === 'number' ? payload.rating : 0,
  };
  memStore.push(created);
  return deepClone(created);
}

async function updateRestaurant(id, payload) {
  const targetId = Number(id);
  if (usingDb()) {
    const updated = await Restaurant.findOneAndUpdate(
      { id: targetId },
      { $set: payload },
      { new: true }
    )
      .select('-_id')
      .lean();

    if (updated && cachedAll) {
      const idx = cachedAll.findIndex((it) => Number(it.id) === targetId);
      if (idx !== -1) cachedAll[idx] = updated;
    }
    return updated ? deepClone(updated) : null;
  }

  const idx = memStore.findIndex((it) => Number(it.id) === targetId);
  if (idx === -1) return null;
  memStore[idx] = { ...memStore[idx], ...payload, id: targetId };
  return deepClone(memStore[idx]);
}

async function deleteRestaurant(id) {
  const targetId = Number(id);
  if (usingDb()) {
    const removed = await Restaurant.findOneAndDelete({ id: targetId })
      .select('-_id')
      .lean();
    if (removed && cachedAll) {
      cachedAll = cachedAll.filter((it) => Number(it.id) !== targetId);
    }
    return removed ? deepClone(removed) : null;
  }

  const idx = memStore.findIndex((it) => Number(it.id) === targetId);
  if (idx === -1) return null;
  const [removed] = memStore.splice(idx, 1);
  return deepClone(removed);
}

async function ensureSeededOnce() {
  if (usingDb()) {
    const count = await Restaurant.estimatedDocumentCount();
    return { seeded: true, count };
  }
  if (memStore.length === 0) await resetStore();
  return { seeded: true, count: memStore.length };
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
