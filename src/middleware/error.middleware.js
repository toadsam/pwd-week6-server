module.exports = function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const payload = {
    error: {
      message: err.message || 'Internal Server Error',
    },
  };

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    payload.error.stack = err.stack;
  }

  console.error('Error:', err.message || err);
  res.status(status).json(payload);
};
