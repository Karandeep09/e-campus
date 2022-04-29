var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "campus"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

exports.db = conn;
exports.mysql = mysql; 