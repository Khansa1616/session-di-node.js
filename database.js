const mysql = require("mysql");

const db = mysql.createconnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "user_mangement",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected...");
});
module.exports = db;
