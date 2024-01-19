import rateLimit from 'express-rate-limit';
import { config } from '../../config.js';

/**
 * DDOS 공격 방어
 */
export default rateLimit({
    windowMs    : config.rateLimit.windowMs  , 
    max         : config.rateLimit.maxRequest,
    keyGenerator: (req, res) => 'dwitter'    ,
});
