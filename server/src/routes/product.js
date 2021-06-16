const express = require("express");
const { applyCoupon } = require("../app/http/controllers/coupon");
const router = express.Router();

const {
  products,
  createProduct,
  productDetails,
  productUpdate,
  deleteProduct,
  adminMarketplaceRoute,
  newProducts,
} = require("../app/http/controllers/products");
const { verifyInstitute } = require("../app/http/middlewares/verifyInstitute");

// !Products Route

// // Admin Marketplace
router.get("/marketplace", adminMarketplaceRoute);

// All Admin Products
router.get("/myproducts", verifyInstitute, newProducts);

// ?Create Product
router.post("/createproduct", verifyInstitute, createProduct);

// ?Product Details
router.get("/:id", verifyInstitute, productDetails);

// ?Update Product
router.put("/:id/update", verifyInstitute, productUpdate);

// ?Delete Product
router.delete("/:id/delete", verifyInstitute, deleteProduct);

exports.productRoutes = router;
