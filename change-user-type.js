require('dotenv').config();
const { connectDB } = require('./src/config/db');
const User = require('./src/models/user.model');

(async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required');
    await connectDB(process.env.MONGO_URI);
    const username = process.argv[2];
    const role = process.argv[3] || 'user';
    if (!username) throw new Error('Usage: node change-user-type.js <username> <role>');
    const user = await User.findOneAndUpdate({ username }, { role }, { new: true });
    if (!user) throw new Error('User not found');
    console.log('Updated:', user.username, '->', user.role);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

