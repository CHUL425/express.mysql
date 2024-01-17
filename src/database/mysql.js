import mysql from 'mysql2';
import { config } from '../../config.js';

const pool = mysql.createPool({
  host    : config.database.host    ,
  database: config.database.database,
  port    : config.database.port    ,
  user    : config.database.user    ,
  password: config.database.password,
});

export const db = pool.promise();