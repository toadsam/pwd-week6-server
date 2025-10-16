const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  res.json({ message: 'get restaurants (stub)' });
});

exports.create = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'create restaurant (stub)' });
});

exports.getById = asyncHandler(async (req, res) => {
  res.json({ message: 'get restaurant by id (stub)' });
});

exports.update = asyncHandler(async (req, res) => {
  res.json({ message: 'update restaurant (stub)' });
});

exports.remove = asyncHandler(async (req, res) => {
  res.status(204).end();
});

