const express = require("express");
const sequelize = require("./db/db");
const studentRoutes = require("./routes/studentsRoutes");

const app = express();
app.use(express.json());

sequelize.sync();

app.use("/students", studentRoutes);

app.listen(3000, () => {
    console.log("Server run on 3000");
});
