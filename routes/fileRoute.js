const express = require("express");

const FILE = require("../controllers/fileController");

const router = express.Router();

router.get("/:filename", FILE.getFile);

module.exports = router;
