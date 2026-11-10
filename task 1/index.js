const express = require('express');
const postgres = require('postgres').default;
const app = express();

const db = postgres({
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'testdb'
});
app.get('/', async (req, res) => {
    const [result] = await db`SELECT NOW()`;
    res.send(`Connected: ${result.now}`);
});

db`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(255)
)`
    .then(() => {
        console.log('Table created');
        app.listen(3000);
    })
    .catch((error) => {
        console.error('Failed to create table:', error);
        process.exitCode = 1;
    });
