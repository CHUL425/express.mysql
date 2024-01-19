import dotenv from 'dotenv';

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;  // process.env의 값을 읽어오거나 default값으로
  if (value == null) {  // null 또는 undefined
    throw new Error(`Key [${key}] is undefined. !!`);
  }

  return value.toString();
}

export const config = {
  port: parseInt(required('PORT', 8080)),                         // 숫자.
  jwt: {
    secretKey   : required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),   // 숫자. 60초*60분*24시간*1일 = 86400
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),     // 숫자. 권고는 10~12 최소 8이상
  },
  database: {
    host    : required('DB_HOST')    ,
    database: required('DB_DATABASE'),
    port    : required('DB_PORT')    ,
    user    : required('DB_USER')    ,
    password: required('DB_PASSWORD'),
  },
  cors: {
    allowedOrigin: required('CORS_ALLOW_ORIGIN'),
  },
  csrf: {
    plainToken: required('CSRF_SECRET_KEY'),
  },
  rateLimit: {
    windowMs: 60000,
    maxRequest: 100,
  },  
}