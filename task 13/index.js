const express = require('express');
const cors = require('cors');
const expenseRoute = require('./routes/expenseRoute');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/expenses', expenseRoute);

app.listen(3000);
