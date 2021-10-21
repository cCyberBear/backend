const express = require("express");

const SCRATH = require("../controllers/scrathController");

const router = express.Router();

router.get("/", SCRATH.scrath);

module.exports = router;
