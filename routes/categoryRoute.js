const express = require("express");

const CATEGORY = require("../controllers/categoryController");

const router = express.Router();

router.post("/", CATEGORY.createCategory);
router.get("/", CATEGORY.getCategory);

module.exports = router;
