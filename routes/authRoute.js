const express = require("express");

const AUTH = require("../controllers/authController");
const { basicAuth } = require("../middlewares/basicAuth");
const { jwtAuth } = require("../middlewares/jwtAuth");

const router = express.Router();

router.post("/register", AUTH.register);
router.post("/login", basicAuth, AUTH.login);

// router.get("/news", AUTH.news);
router.patch("/updatepassword", jwtAuth, AUTH.updatePassword);

router.post("/forgotpassword", AUTH.forgotPassword);
router.post("/password-reset/:id/:token", AUTH.passwordReset);

router.delete("/deleteAccount", jwtAuth, AUTH.delete);
router.get("/randompassword", AUTH.random);

module.exports = router;
