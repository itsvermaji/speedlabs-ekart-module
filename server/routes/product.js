const express = require("express");
const router = express.Router();

const { products, createProduct } = require("../app/http/controllers/products");
const { verifyInstitute } = require("../app/http/middlewares/verifyInstitute");

// Products Route
// View Product
router.get("/allproducts", verifyInstitute, products);
// Create Product
router.post("/createproduct", verifyInstitute, createProduct);
// router.post("/createproduct", (req, res) => {
//   return res.json({ msg: "create product" });
// });

exports.productRoutes = router;
