const express = require("express");
const {
  addItemToCart,
  getCartItems,
  emptyCart,
  removeItemFromCart,
  removeCoupon,
  applyCoupon,
} = require("../app/http/controllers/cart");
const router = express.Router();

const { verifyUser } = require("../app/http/middlewares/verifyUser");

// ? Get Cart Items
router.get("/", verifyUser, getCartItems);

// ? Remove Items from Cart
router.get("/:id/remove", verifyUser, removeItemFromCart);

// ? Redeem Coupon Code
router.get("/:id/couponcode", verifyUser, applyCoupon);

// ? Remove Coupon Code
router.get("/:id/removecoupon", verifyUser, removeCoupon);

// ? Add to Cart
router.post("/addtocart", verifyUser, addItemToCart);

// ? Empty the Cart category
router.delete("/emptycart", verifyUser, emptyCart);

module.exports = router;
