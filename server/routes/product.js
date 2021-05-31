const express = require("express");
const router = express.Router();

const {
  products,
  createProduct,
  productDetails,
  productUpdate,
  deleteProduct,
} = require("../app/http/controllers/products");
const { verifyInstitute } = require("../app/http/middlewares/verifyInstitute");

// !Products Route

// ?View Product
router.get("/allproducts", products);

// ?Create Product
router.post("/createproduct", verifyInstitute, createProduct);

// ?Product Details
router.get("/:id", productDetails);

// ?Update Product
router.put("/:id/update", verifyInstitute, productUpdate);

// ?Delete Product
router.delete("/:id/delete", verifyInstitute, deleteProduct);

exports.productRoutes = router;
