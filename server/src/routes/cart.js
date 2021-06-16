const express = require("express");
const {
  addItemToCart,
  getCartItems,
  emptyCart,
  removeItemFromCart,
} = require("../app/http/controllers/cart");
const { applyCoupon, removeCoupon } = require("../app/http/controllers/coupon");
const router = express.Router();

const { verifyUser } = require("../app/http/middlewares/verifyUser");

// ? Get Cart Items
router.get("/", verifyUser, getCartItems);

// ? Remove Items from Cart
router.get("/:id/remove", verifyUser, removeItemFromCart);

// ? Apply Coupon Code
router.get("/:id", verifyUser, applyCoupon);

// ? Remove Coupon Code
router.get("/:id/removecoupon", verifyUser, removeCoupon);

// ? Add to Cart
router.post("/addtocart", verifyUser, addItemToCart);

// ? Empty the Cart category
router.delete("/emptycart", verifyUser, emptyCart);

// ? Apply coupon to the cart item
module.exports = router;
