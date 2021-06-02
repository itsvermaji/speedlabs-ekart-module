const express = require("express");
const {
  addItemToCart,
  getCartItems,
  emptyCart,
} = require("../app/http/controllers/cart");
const router = express.Router();

const { verifyUser } = require("../app/http/middlewares/verifyUser");

router.post("/", cartController.addItemToCart);
router.get("/", cartController.getCart);
router.delete("/empty-cart", cartController.emptyCart);

// !Coupon Routes
// ? Get Cart Items
router.get("/", verifyUser, getCartItems);

// ? Add to Cart
router.post("/", verifyUser, addItemToCart);

// ? Empty the Cart category
router.delete("/addtocart", verifyUser, emptyCart);

module.exports = router;
