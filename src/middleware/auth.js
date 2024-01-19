import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';
import { config } from '../../config.js';

const AUTH_ERROR   = { massge: 'Authentication Error'};

/**
 * 로그인 사용자인지 확인 - Authentication
 */
export const isAuth = async (req, res, next) => {
  console.log('=========================================================================');

  // 1. Cookie (for Browser)
  // 2. Header (for Non-Browser Client)
  
  let token;

  // check the header first
  const authHeader = req.get('Authorization');
  //console.log(`authHeader: [${authHeader}]`);
  //console.log(`authHeader.startsWith('Bearer'): [${authHeader.startsWith('Bearer')}]`);
  if ((authHeader && authHeader.startsWith('Bearer'))) {
    token = authHeader.split(' ')[1];
    console.log(`authHeader.token`, token);
  }
 
  // if no token in the header, check the cookie
  if (!token) {
    token = req.cookies['token'];
    console.log(`cookies.token`, token);
  }
  console.log(`middleware/auth.js token:`, token);

  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }
  console.log(`통과 1`);

  jwt.verify(
    token,
    config.jwt.secretKey,
    async (error, decoded) => {
      //console.log(`jwt.verify error:[${error}]`);

      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      //console.log(`통과 2`);

      console.log('middleware/authHeader.js isAuth:decoded.id', decoded.id);
      const user = await userRepository.getById(decoded.id)

      console.log('middleware/authHeader.js isAuth:user', user);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      // console.log(`통과 3`);

      req.userId = user.id; // req.customData
      req.token  = token  ;

      console.log('middleware/authHeader.js isAuth:req.userId', req.userId);
      console.log('middleware/authHeader.js isAuth:req.token' , req.token );

      // console.log(`통과 4`);
      next();
    }
  );
  
}