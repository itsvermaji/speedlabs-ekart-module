const express = require("express");
const router = express.Router();

const {
  allCategories,
  createCategory,
} = require("../app/http/controllers/category");
const { verifyInstitute } = require("../app/http/middlewares/verifyInstitute");

// !Coupon Routes
// ? View categories
router.get("/allcategories", verifyInstitute, allCategories);
// ? Create category
router.post("/create", verifyInstitute, createCategory);
// router.post("/createproduct", (req, res) => {
//   return res.json({ msg: "create product" });
// });

module.exports = router;
