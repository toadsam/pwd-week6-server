const cors = require('cors');

function parseOrigins(val) {
  if (!val) return true; // allow all if not set (dev)
  return val.split(',').map((s) => s.trim());
}

module.exports = cors({
  origin: parseOrigins(process.env.CORS_ORIGIN),
  credentials: true,
});

