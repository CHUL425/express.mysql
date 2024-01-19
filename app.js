import express      from 'express'      ;
import cookieParser from 'cookie-parser';
import cors         from 'cors'         ;
import morgan       from 'morgan'       ;
import helmet       from 'helmet'       ;
import 'express-async-errors'           ;
import tweetsRouter   from './src/router/tweets.js'  ;
import authRouter     from './src/router/auth.js'    ;
import { initSocket } from './src/network/socket.js' ;
import { config }     from './config.js'             ;
import { csrfCheck }  from './src/middleware/csrf.js';
import rateLimit      from './src/middleware/rate-limiter.js';
//import { db } from './src/database/mysql.js';
//import { Server } from 'socket.io';

const app = express();

// CORS는 보안상의 이유로 쿠키를 요청 제어. 쿠키 인증이 필요한 경우 true
// allow the Access-Control-Allow-Credentials
const corsOption = {
  origin              : config.cors.allowedOrigin,
  optionsSuccessStatus: 200                      ,
  credentials         : true                     , 
};

app.use(express.json()  ); // Express 애플리케이션에서 JSON 형태의 요청(request) body를 파싱(parse)
app.use(cookieParser()  ); // 요청과 함께 들어온 쿠키를 해석하여 곧바로 req.cookies객체로 만든다.
app.use(helmet()        ); // HTTP 헤더를 자동 설정을 통해 서버 어플리케이션의 보안을 강화
app.use(cors(corsOption)); // 다른 도메인, 다른 프로토콜, 혹은 다른 포트에 있는 리소스를 요청하는 cross-origin HTTP 요청 방식
app.use(morgan('tiny')  ); // 요청과 응답에 대한 정보를 콘솔에 기록
app.use(rateLimit       ); // DDOS공격 방어

// Postman 등 테스트를 하는 경우는 체크를 하면 안됨.
app.use(csrfCheck       ); 

// Router
app.use('/tweets', tweetsRouter);
app.use('/auth'  , authRouter  );

// Not Found.
app.use((req, res) => {
  console.log('Not Found !!!');
  res.sendStatus(404);
});

// Error 처리
app.use((error, req, res) => {
  console.log(error);

  res.status(error.status || 500).json({
    message: error.message,
  });
});

//db.getConnection().then((connection) => console.log(connection));

console.log(config.cors.allowedOrigin);
console.log('===================== Express Server =====================');
console.log(`Server is started.... ${new Date()}`);

const expressServer = app.listen(config.port);
initSocket(expressServer);


// Socket 기본 사용법 테스트
// const socketIO = new Server(expressServer, { cors: { origin: '*', }, });

// console.log('Socket Test!!!');
// socketIO.on('connection', (socket) => {
//   console.log('Client is here!');

//   socketIO.emit('dwitter', 'Hello 😃');
//   socketIO.emit('dwitter', 'Hello 😃');
// });

// setInterval(() => {
//   socketIO.emit('dwitter', '1초마다 안녕... 😃');
// }, 1000);