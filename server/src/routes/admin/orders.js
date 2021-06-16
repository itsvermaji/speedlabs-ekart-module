const express = require("express");
const router = express.Router();

// !Products Route

// Student Routes

// Admin Marketplace
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
