const express = require("express");
const routes = express.Router();
const controller = require("../controller/studentController");

routes.get("/", controller.getAllStudents);
routes.put("/:id", controller.updateEntry);

module.exports = routes;
