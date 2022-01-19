const express = require("express");

const AUTH = require("../controllers/authController");
const { basicAuth } = require("../middlewares/basicAuth");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { authorize } = require("../middlewares/authorize");

const router = express.Router();

router.post("/register", AUTH.register);
router.post("/login", AUTH.login);

router.patch("/updatepassword", jwtAuth, AUTH.updatePassword);
router.post("/forgotpassword", AUTH.forgotPassword);
router.post("/password-reset/:id/:token", AUTH.passwordReset);
router.delete("/deleteAccount", jwtAuth, AUTH.delete);
router.get("/randompassword", AUTH.random);

router.delete("/delete-user/:id", jwtAuth, authorize("admin"), AUTH.deleteUser);
router.get("/all-users", AUTH.getAllUser);
router.post("/add-users", AUTH.addUser);
router.patch("/update-users/:id", AUTH.updateUser);

module.exports = router;
