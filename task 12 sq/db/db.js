const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database4", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
