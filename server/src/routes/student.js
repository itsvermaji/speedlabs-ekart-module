const express = require("express");
const db = require("../app/config/dbConnection");
const router = express.Router();
const { allStudents } = require("../app/http/controllers/studentDetails");
const { verifyInstitute } = require("../app/http/middlewares/verifyInstitute");

// !Student Routes

// ? View Registered Students Categories
router.get("/regstudents", verifyInstitute, allStudents);

module.exports = router;
