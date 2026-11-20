const express = require("express");
const router = express.Router();
const controller = require("../controller/busController");

router.post("/", controller.addBus);
router.get("/available/:seats", controller.getAvailableBuses);

module.exports = router;
