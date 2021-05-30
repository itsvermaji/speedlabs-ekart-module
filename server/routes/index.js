const express = require("express");
const router = express.Router();

// ! Student Imports
const { userAuth } = require("./user.auth");

// ! Student Routes
router.use("/user/auth", userAuth);

//! Institute Admin Imports
const { adminAuth } = require("./admin/auth");
const { productRoutes } = require("./product");
const couponRoutes = require("./coupon");

// ! Institute Admin Routes
// ?Auth
router.use("/admin/auth", adminAuth);
router.use("/admin/product", productRoutes);
// ?Dashboard

// ?Coupons
router.use("/admin/coupon", couponRoutes);

module.exports.appRoutes = router;
