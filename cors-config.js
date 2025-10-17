// CORS 옵션 생성기
// - file:// (origin 'null') 허용
// - 환경변수 CLIENT_URL(쉼표 구분) 추가 허용
// - 개발 환경에서는 목록이 없으면 모두 허용
const getCorsOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
  ];

  if (process.env.CLIENT_URL) {
    allowedOrigins.push(
      ...process.env.CLIENT_URL.split(',').map((s) => s.trim())
    );
  }

  return {
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (origin === 'null') return callback(null, true); // file://
      if (!isProduction) return callback(null, true); // 개발: 모두 허용
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
  };
};

module.exports = getCorsOptions;

