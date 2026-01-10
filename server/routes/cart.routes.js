const express = require("express");
const router = express.Router();

const { addToCart, getCart , removeFromCart,clearCart ,reduceQuantity} = require("../controllers/cart.controller");
const { auth} = require("../middlewares/auth");

router.post("/add", auth, addToCart);
router.get("/", auth, getCart);
router.delete("/remove/:productId", auth, removeFromCart);
router.delete("/clear", auth, clearCart);
router.post("/reduce", auth, reduceQuantity);

module.exports = router;
