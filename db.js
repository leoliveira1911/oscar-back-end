const mysql = require("mysql");
require("dotenv/config");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = db;
