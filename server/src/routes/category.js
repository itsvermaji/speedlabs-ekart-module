const express = require("express");
const router = express.Router();

const {
  allCategories,
  createCategory,
  deleteCategory,
} = require("../app/http/controllers/category");
const { verifyInstitute } = require("../app/http/middlewares/verifyInstitute");

// !Coupon Routes

// ? View categories
router.get("/allcategories", verifyInstitute, allCategories);

// ? Create category
router.post("/create", verifyInstitute, createCategory);

// ? Delete Category
router.delete("/:id/delete", verifyInstitute, deleteCategory);

module.exports = router;
