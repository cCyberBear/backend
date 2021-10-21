const express = require("express");
const BOOK = require("../controllers/bookController");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");
const { ROLES } = require("../constants");

const router = express.Router();

router.get("/", jwtAuth, BOOK.getBook);

router.get("/:id", jwtAuth, BOOK.getBookDetail);

router.post("/", jwtAuth, BOOK.createBook);

router.patch("/:id", BOOK.updateBook);

router.delete("/:id", BOOK.deleteBook);

module.exports = router;
