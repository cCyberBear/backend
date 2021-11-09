const express = require("express");

const mysqlControllerBOOK = require("../../controllers/mysql/bookController");
const { jwtAuth } = require("../../middlewares/jwtAuth");

const router = express.Router();

router.post("/create_book", mysqlControllerBOOK.createBook);
router.get("/get_book", mysqlControllerBOOK.getAllBook);
router.patch("/update_book/:id", mysqlControllerBOOK.updateBook);
router.delete("/delete_book/:id", mysqlControllerBOOK.deleteBook);

module.exports = router;
