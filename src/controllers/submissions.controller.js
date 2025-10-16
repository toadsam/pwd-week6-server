const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  res.json({ message: 'get submissions (stub)' });
});

exports.create = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'create submission (stub)' });
});

exports.review = asyncHandler(async (req, res) => {
  res.json({ message: 'review submission (stub)' });
});

