const express = require("express");
const router = express.Router();

// ! Student Imports
const { verifyUser } = require("../app/http/middlewares/verifyUser");

// ! Student Routes
const { updateDetails } = require("../app/http/controllers/studentDetails");
router.put("/users/update", verifyUser, updateDetails);

// ? Users auth
const { userAuth } = require("./user.auth");
router.use("/users/auth", userAuth);

// ?Cart Routes
const cartRoutes = require("./cart");
router.use("/users/cart", cartRoutes);

// ?Category Routes
const { studentCategories } = require("./studCategory");
router.use("/users/category", studentCategories);

// ?product Students
const { studentProduct } = require("./studProduct");
router.use("/users/product", studentProduct);

// ? Student Orders
const { orderRoutes } = require("./orders");
router.use("/users/orders", orderRoutes);

//! Institute Admin Imports
const { adminAuth } = require("./admin/auth");

// ! Institute Admin Routes
// ?Testing Routes
router.get("/test", (req, res) => {
  return res.status(200).json({ msg: "your got this response!" });
});

// ?Auth Routes
router.use("/admin/auth", adminAuth);

// ?Dashboard
const adminDashboard = require("./admin/dashboard");
router.use("/admin/dashboard", adminDashboard);

// ?Students
const studentDetails = require("./admin/student");
router.use("/admin/student", studentDetails);

// ?Product Routes
const { productRoutes } = require("./product");
router.use("/admin/product", productRoutes);

// ?Categories
const categoryRoutes = require("./category");
router.use("/admin/category", categoryRoutes);

// ?Coupons
const couponRoutes = require("./coupon");
router.use("/admin/coupon", couponRoutes);

// ? Orders
const { adminOrderRoutes } = require("./admin/orders");
router.use("/admin/orders", adminOrderRoutes);

module.exports = router;
