const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const { sendOrderMail } = require("../utils/sendMail");
const { orderPlacedTemplate } = require("../utils/orderMailTemplates"); 
const mongoose = require("mongoose");

exports.placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const userId = req.user.userId;
    const  orderType = req.body.orderType || "DELIVERY";

    const cart = await Cart.findOne(
        {
      user: userId,
      status: "ACTIVE"
        }
      ).session(session);

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // inventory check + decrement (atomic via transaction)
    for (const item of cart.items) {
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.product,
          inventory: { $gte: item.quantity }
        },
        { 
            $inc: { inventory: -item.quantity }
         },
        { new: true, session }
      );

      if (!updatedProduct) {
        throw new Error("Insufficient inventory");
      }
    }

    const [order] = await Order.create(
      
        [{
          userId,
          items: cart.items,
          totalAmount: cart.totalAmount,
          orderType
        }]
      ,
      { session }

    );

    cart.status = "ORDERED";
    await cart.save({ session });

 const populatedOrder = await Order.findById(order._id)
  .populate("items.product")
  .session(session); // REQUIRED inside transaction


    console.log("Order placed:",populatedOrder);

    await sendOrderMail(
        {
      to: req.user.email,
      subject: "Your order has been placed 🍕",
      html: orderPlacedTemplate(populatedOrder)
    }
);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id
    });

  } 
  catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};

const { orderReceivedTemplate } = require("../utils/orderMailTemplates");

exports.markOrderReceived = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("userId")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "RECEIVED";
    await order.save();

    await sendOrderMail({
      to: order.userId.email,
      subject: "Your order is received 🍕",
      html: orderReceivedTemplate(order)
    });

    res.json({ message: "Order marked as received" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const { orderCancelledTemplate } = require("../utils/orderMailTemplates")




exports.cancelOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user.userId;
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId })
      .populate("items.product")
      .populate("userId")
      .session(session);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== "PLACED") {
      throw new Error("Only placed orders can be cancelled");
    }

    // restore inventory
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        { $inc: { inventory: item.quantity } },
        { session }
      );
    }

    order.status = "CANCELLED";
    await order.save({ session });

    // commit DB changes first
    await session.commitTransaction();
    session.endSession();

  
    await sendOrderMail({
      to: order.userId.email,
      subject: "Your order has been cancelled",
      html: orderCancelledTemplate(order)
    });

    res.json({ message: "Order cancelled successfully" });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({
      message: error.message || "Order cancellation failed"
    });
  }
};






// // exports.placeOrder = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     console.log("Placing order for user:", userId);
//     const { orderType } = req.body;

//     const cart = await Cart.findOne({
//       user: userId,
//       status: "ACTIVE"
//     });

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // inventory check + decrement
//     for (const item of cart.items) {
//         //    console.log("Insufficient inventory for product:", item.product,"-->",item.quantity,);
//       const updatedProduct = await Product.findOneAndUpdate(
//         {
//           _id: item.product,
//           inventory: { $gte: item.quantity }
//         },
//         {
//           $inc: { inventory: -item.quantity }
//         },
//         { new: true }
//       );

//       if (!updatedProduct) {
     
//         return res.status(400).json({
//           message: "Insufficient inventory for one or more products"
//         });
//       }
//     }

//     const order = await Order.create({
//       userId: userId,
//       items: cart.items,
//       totalAmount: cart.totalAmount,
//       orderType
//     });

//     cart.status = "ORDERED";
//     await cart.save();

//     res.status(201).json({
//       message: "Order placed successfully",
//       orderId: order._id
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message});
//   }
// };

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ userId: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

      console.log("All orders fetched:", orders); 
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};


