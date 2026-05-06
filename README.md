# pwd-week6-server

Express와 MongoDB 기반의 음식점/제출/사용자 인증 API 서버입니다. 세션, Passport 인증, 로컬 로그인, 소셜 로그인, 관리자 유틸리티 스크립트를 포함한 Node.js 백엔드 프로젝트입니다.

## 프로젝트 개요

`pwd-week6-server`는 주차별 백엔드 학습의 확장 프로젝트로, 음식점 데이터와 사용자 제출 데이터를 관리하고 인증 기능을 제공합니다. MongoDB 연결 상태에 따라 세션 저장소를 MongoStore 또는 메모리 세션으로 구성합니다.

## 주요 기능

- Express 5 기반 REST API
- MongoDB / Mongoose 데이터 모델
- 세션 기반 인증
- Passport Local, Google OAuth, Naver OAuth 설정
- 음식점 API
- 제출 API
- 사용자 API
- 관리자 생성 및 사용자 타입 변경 스크립트
- Jest / Supertest 테스트 환경

## 기술 스택

- Node.js
- Express `5`
- MongoDB / Mongoose
- express-session
- connect-mongo
- Passport
- Jest
- Supertest

## 폴더 구조

```text
.
├── server.js
├── src/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── services/
├── tests/
├── create-admin.js
├── change-user-type.js
├── cors-config.js
└── package.json
```

## 실행 방법

```bash
npm install
npm run dev
```

운영 방식으로 실행하려면 다음 명령을 사용합니다.

```bash
npm start
```

## 테스트

```bash
npm test
npm run test:watch
```

## 환경 변수

실행 환경에 맞게 `.env` 파일을 구성합니다.

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/pwd-week6
DB_NAME=pwd-week6
SESSION_SECRET=change-me
```

소셜 로그인을 사용할 경우 Google/Naver OAuth 클라이언트 정보도 별도로 설정해야 합니다.

## API 엔드포인트

- `GET /health`: 서버와 DB 연결 상태 확인
- `/api/auth`: 인증 관련 API
- `/api/users`: 사용자 API
- `/api/restaurants`: 음식점 API
- `/api/submissions`: 제출 API

## 관리 스크립트

```bash
npm run create-admin
npm run change-user-type
```

## 개발 메모

저장소에 `node_modules`가 포함되어 있으므로, 이후 정리 시에는 `.gitignore`를 점검하고 의존성은 `package-lock.json` 기준으로 복원하는 방식으로 관리하는 것이 좋습니다.
