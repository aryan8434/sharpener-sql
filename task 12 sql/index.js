const express = require("express");
const { sequelize, Student, IdentityCard, Department, Course } =
  require("./models");

const app = express();
app.use(express.json());

async function seedData() {
  const [computerScience] = await Department.findOrCreate({
    where: { name: "Computer Science" },
  });
  const [student] = await Student.findOrCreate({
    where: { email: "aryan@example.com" },
    defaults: { name: "Aryan", DepartmentId: computerScience.id },
  });
  await IdentityCard.findOrCreate({
    where: { cardNumber: "STU-001" },
    defaults: { StudentId: student.id },
  });

  const [nodeCourse] = await Course.findOrCreate({
    where: { title: "Node.js" },
  });
  const [sqlCourse] = await Course.findOrCreate({
    where: { title: "SQL" },
  });
  await student.addCourses([nodeCourse, sqlCourse]);
}

app.get("/", (req, res) => {
  res.send("Student-Course Association API");
});

app.get("/students", async (req, res) => {
  const students = await Student.findAll({
    include: [IdentityCard, Department, Course],
  });
  res.json(students);
});

sequelize
  .sync({ alter: true })
  .then(async () => {
    await sequelize.authenticate();
    await seedData();
    app.listen(4000, () => {
      console.log("Server running on http://localhost:4000");
    });
  })
  .catch((error) => {
    console.error("Database setup failed:", error);
  });
