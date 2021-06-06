const express = require("express");
const router = express.Router();

const {
  allCoupons,
  createCoupon,
  couponDetails,
  deleteCoupon,
  updateCoupon,
} = require("../app/http/controllers/coupon");
const { validateCoupon } = require("../app/http/middlewares/validateCoupon");
const { verifyInstitute } = require("../app/http/middlewares/verifyInstitute");
const { joiSchema } = require("../validations/coupon");

// !Coupon Routes
// ? View Coupons
router.get("/allcoupons", verifyInstitute, allCoupons);

// ? Create Coupon
router.post(
  "/create",
  verifyInstitute,
  validateCoupon(joiSchema),
  createCoupon
);

// ? GET coupon details
router.get("/:id", verifyInstitute, couponDetails);

// ? Update Coupons
router.put(
  "/:id/update",
  verifyInstitute,
  validateCoupon(joiSchema),
  updateCoupon
);

// ? Delete Coupon
router.delete("/:id/delete", verifyInstitute, deleteCoupon);

// router.post("/createproduct", (req, res) => {
//   return res.json({ msg: "create product" });
// });

module.exports = router;
