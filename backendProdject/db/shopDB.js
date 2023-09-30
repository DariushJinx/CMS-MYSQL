const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"shop"
});

connection.connect((err) => {
  if (err) {
    console.log(`Error => ${err.stack}`);
    return;
  }
  console.log("Connected to server...");
});



module.exports = connection;
