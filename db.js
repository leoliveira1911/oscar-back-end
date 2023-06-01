const mysql = require("mysql");
require("dotenv/config");

const db = mysql.createConnection(process.env.DATABASE_URL);

module.exports = db;
