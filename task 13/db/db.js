const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    password: "123456",
    user: "root",
    database: "database12"
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    const query = `
    CREATE TABLE IF NOT EXISTS expenses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL
    )`;

    connection.execute(query, (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
});

module.exports = connection;