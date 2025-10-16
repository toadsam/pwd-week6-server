const jwt = require('jsonwebtoken');

function auth(required = true) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.substring(7)
        : null;

      if (!token) {
        if (required) return res.status(401).json({ message: 'Unauthorized' });
        req.user = null;
        return next();
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
      req.user = { id: payload.id, role: payload.role };
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}

module.exports = { auth };

