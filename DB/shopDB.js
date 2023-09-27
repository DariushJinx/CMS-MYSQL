const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

connection.connect((err) => {
  if (err) {
    console.log(`Error => ${err.stack}`);
    return;
  }
  console.log("Connected to server...");
});

// create database

const createDatabaseQuery = `
CREATE DATABASE IF NOT EXISTS Shop
CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci
`;

connection.query(createDatabaseQuery, (err, results, fields) => {
  if (err) {
    console.log("error => ", err.message);
  } else {
    console.log("create database successfully");
    console.log("fields : ", fields);
  }
});

connection.changeUser({ database: "Shop" }, (err) => {
  if (err) {
    console.log("err");
  } else {
    console.log("database selected successfully");
  }
});

let tableNameProduct = "Products";

// Query to create table Products
let queryProduct = `CREATE TABLE IF NOT EXISTS ${tableNameProduct} 
      (
        id INT(100) AUTO_INCREMENT PRIMARY KEY, 
        title VARCHAR(100) NOT NULL,
        price INT(100) NOT NULL,
        count INT(100) NOT NULL,
        img VARCHAR(100) DEFAULT "img.png",
        popularity INT(100) NOT NULL,
        sale INT(100) NOT NULL,
        colors INT(100) NOT NULL
      )`;

connection.query(queryProduct, (err, rows) => {
  if (err) throw err;

  console.log(`Successfully Created Table - ${tableNameProduct}`);
});

let tableNameUsers = "Users";

// Query to create table Users
let queryUsers = `CREATE TABLE IF NOT EXISTS ${tableNameUsers} 
      (
        id INT(100) AUTO_INCREMENT PRIMARY KEY, 
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        phone BIGINT NOT NULL,
        city VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        address TEXT(1000) NOT NULL,
        score INT(100) NOT NULL
      )`;

connection.query(queryUsers, (err, rows) => {
  if (err) throw err;

  console.log(`Successfully Created Table - ${tableNameUsers}`);
});

let tableNameComments = "Comments";
// Query to create table Comments
let queryComment = `CREATE TABLE IF NOT EXISTS ${tableNameComments}
      (
        id INT(100) AUTO_INCREMENT PRIMARY KEY,
        title TEXT(1000) NOT NULL,
        body TEXT(1000) NOT NULL,
        date VARCHAR(100) NOT NULL,
        hour VARCHAR(100) NOT NULL,
        userID INT(100) NOT NULL,
        FOREIGN KEY(userID)
        REFERENCES Users(id),
        productID INT(100) NOT NULL,
        FOREIGN KEY(productID) 
        REFERENCES Products(id)
      )`;

connection.query(queryComment, (err, rows) => {
  if (err) throw err;

  console.log(`Successfully Created Table - ${tableNameComments}`);
});

let tableNameOrders = "Orders";

// Query to create table Orders
let queryOrders = `CREATE TABLE IF NOT EXISTS ${tableNameOrders} 
      (
        id INT(100) AUTO_INCREMENT PRIMARY KEY,
        userID INT(100) NOT NULL,
        FOREIGN KEY (userID) REFERENCES Users(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
        productID INT(100) NOT NULL,
        FOREIGN KEY (productID) REFERENCES Products(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
        date VARCHAR(100) NOT NULL,
        hour VARCHAR(100) NOT NULL,
        price BIGINT NOT NULL,
        off INT(100) NOT NULL,
        sale BIGINT NOT NULL,
        popularity INT(100) NOT NULL,
        count BIGINT NOT NULL,
        isActive INT(10) NOT NULL DEFAULT 0
      )`;

connection.query(queryOrders, (err, rows) => {
  if (err) throw err;

  console.log(`Successfully Created Table - ${tableNameOrders}`);
});

let tableNameOffs = "Offs";

// Query to create table Offs
let queryOffs = `CREATE TABLE IF NOT EXISTS ${tableNameOffs} 
      (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        code VARCHAR(100) NOT NULL,
        percent INT(100) NOT NULL,
        adminID INT(100) NOT NULL,
        FOREIGN KEY (adminID) REFERENCES Users(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
        productID INT(100) NOT NULL,
        FOREIGN KEY (productID) REFERENCES Products(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
        date VARCHAR(100) NOT NULL,
        isActive INT(1) NOT NULL
      )`;

connection.query(queryOffs, (err, rows) => {
  if (err) throw err;

  console.log(`Successfully Created Table - ${tableNameOffs}`);
});

let tableNameAdmins = "Admins";

// Query to create table Admins
let queryAdmins = `CREATE TABLE IF NOT EXISTS ${tableNameAdmins} 
      (
        id INT(100) AUTO_INCREMENT PRIMARY KEY, 
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        task VARCHAR(100) NOT NULL
      )`;

connection.query(queryAdmins, (err, rows) => {
  if (err) throw err;

  console.log(`Successfully Created Table - ${tableNameAdmins}`);
});

module.exports = connection;
