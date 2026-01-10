const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");

// Register user (OTP must be verified before this)
router.post("/register", register);

// Login user
router.post("/login", login);

module.exports = router;
