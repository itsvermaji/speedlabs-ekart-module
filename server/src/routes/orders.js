const express = require("express");
const { orders, orderDetails } = require("../app/http/controllers/orders");
const { verifyUser } = require("../app/http/middlewares/verifyUser");
const router = express.Router();

// !Products Route

// Order
router.get("/", verifyUser, orders);

// All Admin Products
router.get("/:id/details", verifyUser, orderDetails);

exports.orderRoutes = router;
