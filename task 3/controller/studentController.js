const db = require("../utils/db-connection");

const addEntries = (req, res) => {
  const { email, name } = req.body;
  const insertQuery = `INSERT INTO users (name, email) values (?,?)`;
  db.execute(insertQuery, [name, email], (err) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Failed to add student");
    }
    console.log("Data inserted successfully");
    res
      .status(200)
      .send(`Student with name ${name} and email ${email} added successfully`);
  });
};

const deleteEntry = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).send("Student id must be a positive integer");
  }

  const deleteQuery = "DELETE FROM users WHERE id = ?";
  db.execute(deleteQuery, [id], (err, result) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Failed to delete student");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send(`Student with id ${id} not found`);
    }

    res.status(200).send(`Student with id ${id} deleted successfully`);
  });
};

module.exports = {
  addEntries,
  deleteEntry,
};
