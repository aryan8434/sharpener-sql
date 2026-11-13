const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "database2",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
  const createQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20), 
    email VARCHAR(20) 
  )`;
  connection.execute(createQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      return;
    }
    console.log("Table created successfully");
  });
});

module.exports = connection;
