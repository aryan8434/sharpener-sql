const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Student = sequelize.define("Student", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const IdentityCard = sequelize.define("IdentityCard", {
  cardNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Department = sequelize.define("Department", {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Course = sequelize.define("Course", {
  title: { type: DataTypes.STRING, allowNull: false },
});

const StudentCourse = sequelize.define("StudentCourse", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Student.hasOne(IdentityCard);
IdentityCard.belongsTo(Student);

Department.hasMany(Student);
Student.belongsTo(Department);

Student.belongsToMany(Course, { through: StudentCourse });
Course.belongsToMany(Student, { through: StudentCourse });

module.exports = { sequelize, Student, IdentityCard, Department, Course, StudentCourse };
