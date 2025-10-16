require('dotenv').config();
const { connectDB } = require('./src/config/db');
const User = require('./src/models/user.model');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required');
    await connectDB(process.env.MONGO_URI);
    const username = process.argv[2] || 'admin';
    const email = process.argv[3] || 'admin@example.com';
    const password = process.argv[4] || 'admin1234';
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hash, role: 'admin' });
    console.log('Admin created:', user.username);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

