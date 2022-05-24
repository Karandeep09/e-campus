var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "26265500",
  database: "campus"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

exports.db = conn;
exports.mysql = mysql; 