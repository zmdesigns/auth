const mysql = require('mysql2/promise');
require('dotenv').config();

var connection_details = {
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5,
  dateStrings: true, //stop casting to horrid js dates =/
};

//create mysql connection pool
export const conn = mysql.createPool(connection_details);
