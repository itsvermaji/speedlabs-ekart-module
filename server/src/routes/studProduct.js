const express = require("express");
const router = express.Router();

const {
  productDetails,
  studentMarketplace,
  studentProducts,
  addReview,
  deleteReview,
  allReviews,
} = require("../app/http/controllers/products");
const { verifyUser } = require("../app/http/middlewares/verifyUser");
const { verifyPurchase } = require("../app/http/middlewares/verifyPurchase");

// !Products Route

// ?Market Place Products
router.get("/marketplace", studentMarketplace);

// ?Product Details
router.get("/:id", productDetails);

// ?View purchased products Product
router.get("/", verifyUser, studentProducts);

// ? Reviews
router.get("/:id/reviews", allReviews);

//  ?Add Reviews
router.post("/:id/review/:content/post", verifyUser, verifyPurchase, addReview);

//  ?Delete Reviews
router.delete(
  "/:id/review/:content/delete",
  verifyUser,
  verifyPurchase,
  deleteReview
);

exports.studentProduct = router;
