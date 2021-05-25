const express = require("express");
const instituteAuth = require("../app/http/controllers/instituteAuth");
const { products } = require("../app/http/controllers/Products");
const studentAuth = require("../app/http/controllers/studentAuth");
const { verifyInstitute } = require("../app/http/middlewares/verifyInstitute");
const router = express.Router();

// Students
router.get("/register", studentAuth.register);
router.post("/register", studentAuth.postRegister);

router.get("/login", studentAuth.login);
router.post("/login", studentAuth.postLogin);

// Institutes
// Register Intitute
router.get("/admin/register", instituteAuth.register);
router.post("/admin/register", instituteAuth.postRegister);

// Login Institute
router.get("/admin/login", instituteAuth.login);
router.post("/admin/login", instituteAuth.postLogin);

// Protected Route
router.get("/admin/products", verifyInstitute, products);

module.exports = router;
