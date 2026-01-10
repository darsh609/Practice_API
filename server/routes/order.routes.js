const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,markOrderReceived
} = require("../controllers/order.controller");

const { auth ,isAdmin } = require("../middlewares/auth");


router.post("/", auth, placeOrder);


router.get("/all", auth, isAdmin, getAllOrders);
router.get("/my-orders", auth, getMyOrders);
router.put(
  "/:orderId/received",
  auth,
  isAdmin,
  markOrderReceived
);


const { cancelOrder } = require("../controllers/order.controller");

router.put(
  "/:orderId/cancel",
  auth,
  cancelOrder
);


module.exports = router;
