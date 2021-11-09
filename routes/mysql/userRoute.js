const express = require("express");

const mysqlController = require("../../controllers/mysql/userController");

const router = express.Router();

router.get("/", mysqlController.getAll);
router.post("/", mysqlController.createUser);

module.exports = router;
