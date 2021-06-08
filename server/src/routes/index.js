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
const studentDetails = require("./student");
const couponRoutes = require("./coupon");
const categoryRoutes = require("./category");
const cartRoutes = require("./cart");

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

// ?Cart Routes
router.use("/user/cart", cartRoutes);

const db = require("../app/config/dbConnection");

router.get("/public/url", (req, res) => {
  db.query("SELECT * FROM products", (err, rows) => {
    if (err) {
      return res.status(400).json({ msg: "An error occured!" });
    }

    if (rows.length < 1) {
      return res.status(400).json({ msg: "No products!" });
    }
    return res.status(200).json(rows);
  });
});

module.exports = router;
