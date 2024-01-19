## Getting Started

First, run the development server:

```bash

npm install socket.io-client  -- 클라이언트에서 설치 필요

npm init
npm install nodemon --save-dev
npm install dotenv

npm install --save bcryptjs && npm uninstall --save bcrypt
npm install express
npm install express-async-errors
npm install express-validator
npm install cors helmet morgan
npm install --save-dev @types/cors

npm install jsonwebtoken
npm install socket.io
npm install mysql2
npm install cookie-parser
npm install express-rate-limit

```

## Table

```bash
CREATE TABLE `tweets` (
  `id` bigint NOT NULL,
  `text` varchar(256) NOT NULL,
  `userid` int NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_id` (`userid`),
  CONSTRAINT `fk_id` FOREIGN KEY (`userid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tweets 정보'

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `photo` text,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`) /*!80000 INVISIBLE */,
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='사용자 정보'

```
