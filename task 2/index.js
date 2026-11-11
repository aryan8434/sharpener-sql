const express = require("express");
const app = express();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "testdb",
  multipleStatements: true,
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }

  console.log("Connected to MySQL database");
  const creationQuery = `CREATE TABLE Users (
  id int primary key auto_increment,
  name varchar(255),
  email varchar(255)
  );
  CREATE TABLE buses (
  id int primary key auto_increment,
  bus_number int,
  total_seats int,
  available_seats int
);
  CREATE TABLE bookings (
  id int primary key auto_increment,
  seatNumber int);
  CREATE TABLE Payments (
  id int primary key auto_increment,
  amount int,
  paymentStatus boolean
  paymentStatus boolean
)`;
  connection.query(creationQuery, (err) => {
    if (err) {
      console.error("Error creating table: " + err.stack);
      return;
    }

    app.get("/", (req, res) => {
      res.send("Bus booking");
    });

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  });
});
