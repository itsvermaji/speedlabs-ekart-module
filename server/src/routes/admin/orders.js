const express = require("express");
const { orders, orderDetails } = require("../../app/http/controllers/orders");
const {
  verifyInstitute,
} = require("../../app/http/middlewares/verifyInstitute");
const router = express.Router();

// !Products Route

// Order
router.get("/", verifyInstitute, orders);

// All Admin Products
router.get("/:id/details", verifyInstitute, orderDetails);

exports.adminOrderRoutes = router;
