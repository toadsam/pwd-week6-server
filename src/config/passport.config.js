// 패스포트 설정 스텁(필요 시 구현)
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

module.exports = function configurePassport(passport) {
  if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET not set; passport-jwt is disabled.');
    return;
  }

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        // TODO: 유저 조회 로직 연결
        return done(null, { id: payload.id, role: payload.role });
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

