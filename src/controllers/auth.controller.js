const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
  res.json({ message: 'register (stub)' });
});

exports.login = asyncHandler(async (req, res) => {
  res.json({ message: 'login (stub)' });
});

exports.profile = asyncHandler(async (req, res) => {
  res.json({ message: 'profile (stub)' });
});

