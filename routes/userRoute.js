const express = require("express");

const USER = require("../controllers/userController");
const { basicAuth } = require("../middlewares/basicAuth");
const { jwtAuth } = require("../middlewares/jwtAuth");

const router = express.Router();

router.post("/register", USER.register);
router.post("/login", basicAuth, USER.login);
router.patch("/updatepassword", jwtAuth, USER.updatePassword);
router.post("/forgotpassword", USER.forgotPassword);
router.post("/password-reset/:id/:token", USER.passwordReset);

router.get("/detail", jwtAuth, USER.getDetail);

module.exports = router;
