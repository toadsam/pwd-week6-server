const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  res.json({ message: 'get users (stub)' });
});

exports.changeRole = asyncHandler(async (req, res) => {
  res.json({ message: 'change role (stub)' });
});

