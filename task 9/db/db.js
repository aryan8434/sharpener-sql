const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    password: "123456",
    user: "root",
    database: "database12"
});

connection.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("succeess");

    const query = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(30) UNIQUE
    )`;

    connection.execute(query, (err) => {
        if (err) 
        {
            console.log(err);
            return;
        }
        console.log("success");
    });
});

module.exports = connection;