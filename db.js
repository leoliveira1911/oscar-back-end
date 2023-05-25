const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  database: "oscar",
  port: 3306,
  user: "root",
  password: '2910'
});

module.exports = db;
