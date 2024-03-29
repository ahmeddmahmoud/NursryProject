const express = require("express");
const controller = require("./../controller/authenticationController");
const router = express.Router();

router.post("/login", controller.checkTeacher);

module.exports = router;
