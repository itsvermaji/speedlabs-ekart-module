const express = require("express");
const instituteAuth = require("../../app/http/controllers/instituteAuth");
const router = express.Router();

// Institute Dashboard
// Register Intitute
router.get("/register", instituteAuth.register);
router.post("/register", instituteAuth.postRegister);
// router.post("/register", (req, res) => {
//   console.log("Registered");
// });

// Login Institute
router.get("/login", instituteAuth.login);
router.post("/login", instituteAuth.postLogin);

module.exports.adminAuth = router;
