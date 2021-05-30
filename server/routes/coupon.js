const express = require("express");
const router = express.Router();

const { allCoupons, createCoupon } = require("../app/http/controllers/coupon");
const { verifyInstitute } = require("../app/http/middlewares/verifyInstitute");

// !Coupon Routes
// ? View Coupons
router.get("/allcoupons", verifyInstitute, allCoupons);
// ? Create Product
router.post("/create", verifyInstitute, createCoupon);
// router.post("/createproduct", (req, res) => {
//   return res.json({ msg: "create product" });
// });

module.exports = router;
