const express = require("express");
const instituteAuth = require("../app/http/controllers/institutes/authController");
const studentAuth = require("../app/http/controllers/students/authController");
const router = express.Router();

// Students
router.get("/register", studentAuth().register);
router.post("/register", studentAuth().postRegister);

router.get("/login", studentAuth().login);
router.post("/login", studentAuth().postLogin);

// Institutes
router.get("/admin/register", instituteAuth().register);
router.post("/admin/register", instituteAuth().postRegister);

router.get("/admin/login", instituteAuth().login);
router.post("/admin/login", instituteAuth().postLogin);

module.exports = router;
