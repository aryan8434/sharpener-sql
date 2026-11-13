const express = require("express");
const app = express();
const db = require("./task 3/utils/db-connection");
const studentRoutes = require("./task 3/routes/studentRoutes");

app.use(express.json());
app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.put("/update", (req, res) => {
  const { email, name } = req.body;
  const updateQuery = `UPDATE users SET name = ? WHERE email = ?`;
  db.execute(updateQuery, [name, email], (err) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send("Failed to update student");
    }
    console.log("Data updated successfully");
    res
      .status(200)
      .send(
        `Student with name ${name} and email ${email} updated successfully`,
      );
  });
});

app.listen(3000);
