const express = require("express");
const router = express.Router();
const {
  allStudents,
  studentDetails,
  updateStudentDetails,
  deleteStudent,
} = require("../../app/http/controllers/admin/studentDetails");
const {
  adminStudentRegistration,
} = require("../../app/http/controllers/userAuth");
const {
  verifyInstitute,
} = require("../../app/http/middlewares/verifyInstitute");

// !Student Routes

// ? View Registered Students Categories
router.get("/regstudents", verifyInstitute, allStudents);

// ? Register Student
router.post("/register", verifyInstitute, adminStudentRegistration);

// ? View Student Details
router.get("/:id", verifyInstitute, studentDetails);

// ? Update Student details
router.put("/:id/update", verifyInstitute, updateStudentDetails);

// ? Delete Student Account
router.delete("/:id/delete", verifyInstitute, deleteStudent);

module.exports = router;
