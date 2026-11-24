const db = require('../db/db');

function getExpenses(req, res) {
    db.query('SELECT * FROM expenses', (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(result);
    });
}

function createExpense(req, res) {
    const { name, amount } = req.body;
    db.query('INSERT INTO expenses (name, amount) VALUES (?, ?)', [name, amount], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(201).json(result);
    });
}

function deleteExpense(req, res) {
    db.query('DELETE FROM expenses WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        return res.json({ message: 'Expense deleted' });
    });
}

module.exports = { getExpenses, createExpense, deleteExpense };
