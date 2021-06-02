const express = require("express");
const router = express.Router();

const { allCoupons, createCoupon } = require("../app/http/controllers/coupon");
const { validateCoupon } = require("../app/http/middlewares/validateCoupon");
const { verifyInstitute } = require("../app/http/middlewares/verifyInstitute");
const { joiSchema } = require("../validations/coupon");

// !Coupon Routes
// ? View Coupons
router.get("/allcoupons", verifyInstitute, allCoupons);
// ? Create Product
router.post(
  "/create",
  verifyInstitute,
  validateCoupon(joiSchema),
  createCoupon
);
// router.post("/createproduct", (req, res) => {
//   return res.json({ msg: "create product" });
// });

module.exports = router;
