const express = require("express");
const router = express.Router();

// ! Student Imports
const { userAuth } = require("./user.auth");
const { studentProduct } = require("./studProduct");
const cartRoutes = require("./cart");

// ! Student Routes
// ? Users auth
router.use("/users/auth", userAuth);

// ?Cart Routes
router.use("/users/cart", cartRoutes);

// ?product Students
router.use("/users/products", studentProduct);

//! Institute Admin Imports
const { adminAuth } = require("./admin/auth");
const adminDashboard = require("./admin/dashboard");
const { productRoutes } = require("./product");
const studentDetails = require("./student");
const couponRoutes = require("./coupon");
const categoryRoutes = require("./category");

// ! Institute Admin Routes
// ?Testing Routes
router.get("/test", (req, res) => {
  return res.status(200).json({ msg: "your got this response!" });
});

// ?Auth Routes
router.use("/admin/auth", adminAuth);

// ?Dashboard
router.use("/admin/dashboard", adminDashboard);

// ?Students
router.use("/admin/student", studentDetails);

// ?Product Routes
router.use("/admin/product", productRoutes);

// ?Coupons
router.use("/admin/coupon", couponRoutes);

// ?Categories
router.use("/admin/category", categoryRoutes);

module.exports = router;
