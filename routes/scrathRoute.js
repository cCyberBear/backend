const express = require("express");

const SCRATH = require("../controllers/scrathController");

const router = express.Router();

router.get("/", SCRATH.scrath);
router.get("/all", SCRATH.all);

module.exports = router;
