const mysql = require("mysql");

const db = mysql.createConnection({
  host: "to-do-list-test.cmid9eadco8w.sa-east-1.rds.amazonaws.com",
  database: "oscar",
  port: 3306,
  user: "admin",
  password: "Oliveiraleo12.",
});

module.exports = db;
