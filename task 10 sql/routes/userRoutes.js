const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");

router.post("/", controller.addUser);
router.get("/", controller.getAllUsers);

module.exports = router;
