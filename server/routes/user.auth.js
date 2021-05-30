const express = require("express");
const router = express.Router();

const userAuth = require("../app/http/controllers/userAuth");

// Students
router.post("/register", userAuth.postRegister);

router.get("/login", userAuth.login);
router.post("/login", userAuth.postLogin);

module.exports.userAuth = router;
