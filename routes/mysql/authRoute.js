const express = require("express");

const mysqlControllerAUTH = require("../../controllers/mysql/authController");
const { jwtAuth } = require("../../middlewares/jwtAuth");

const router = express.Router();

router.post("/register", mysqlControllerAUTH.register);
router.post("/login", mysqlControllerAUTH.login);
router.post("/update_password", jwtAuth, mysqlControllerAUTH.updatePassword);

module.exports = router;
