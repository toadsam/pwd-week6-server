// src/services/auth.service.js
const User = require('../models/user.model');

class AuthService {
  async register(userData) {
    const { email, password, name } = userData;

    const existingUser = await User.findOne({ email: email.toLowerCase(), provider: 'local' });
    if (existingUser) {
      const err = new Error('이미 사용 중인 이메일입니다.');
      err.status = 409;
      throw err;
    }

    const lower = email.toLowerCase();
    const user = await User.create({
      email: lower,
      password,
      name,
      provider: 'local',
      // provider_1_providerId_1 유니크 인덱스 충돌 회피
      providerId: lower,
    });

    return user;
  }

  async getCurrentUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error('사용자를 찾을 수 없습니다.');
      err.status = 404;
      throw err;
    }
    return user;
  }

  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error('사용자를 찾을 수 없습니다.');
      err.status = 404;
      throw err;
    }
    return user;
  }
}

module.exports = new AuthService();
