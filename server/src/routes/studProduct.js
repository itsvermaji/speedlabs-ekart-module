const express = require("express");
const router = express.Router();

const {
  products,
  productDetails,
  studentMarketplace,
  newProducts,
} = require("../app/http/controllers/products");
const { verifyUser } = require("../app/http/middlewares/verifyUser");

// !Products Route

// ?Market Place
router.get("/marketplace", studentMarketplace);
// router.get("/marketplace", (req, res) => {
//   console.log("Hello there!");
// });

// ?View purchased products Product
router.get("/", verifyUser, newProducts);

// ?Product Details
router.get("/:id", productDetails);

exports.studentProduct = router;
