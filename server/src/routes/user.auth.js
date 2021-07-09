const express = require("express");
const router = express.Router();

const userAuth = require("../app/http/controllers/userAuth");

// Students
// Register
router.post("/register", userAuth.studentRegistration);

// Login
router.post("/login", userAuth.studentLogin);

module.exports.userAuth = router;
