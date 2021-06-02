const express = require("express");
const router = express.Router();

// ! Student Imports
const { userAuth } = require("./user.auth");

// ! Student Routes
router.use("/user/auth", userAuth);

//! Institute Admin Imports
const { adminAuth } = require("./admin/auth");
const adminDashboard = require("./admin/dashboard");
const { productRoutes } = require("./product");
const couponRoutes = require("./coupon");
const categoryRoutes = require("./category");

// ! Institute Admin Routes
// ?Auth
router.use("/admin/auth", adminAuth);
router.use("/admin/product", productRoutes);

// ?Dashboard
router.use("/admin/dashboard", adminDashboard);

// ?Coupons
router.use("/admin/coupon", couponRoutes);

// ?Categories
router.use("/admin/category", categoryRoutes);

module.exports = router;
