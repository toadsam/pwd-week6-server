require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const { connectDB } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    if (process.env.MONGO_URI) {
      await connectDB(process.env.MONGO_URI);
      console.log('MongoDB connected');
    } else {
      console.log('MONGO_URI not set. Skipping DB connection.');
    }
  } catch (err) {
    console.error('DB connection error:', err.message);
  }

  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();

