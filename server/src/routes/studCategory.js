const express = require("express");
const { allCategories } = require("../app/http/controllers/category");
const router = express.Router();

// !Category Route

// ? View categories
router.get("/allcategories", allCategories);

exports.studentCategories = router;
