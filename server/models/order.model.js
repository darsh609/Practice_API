const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    
    items: [
      {
         product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
          },
          quantity: {
            type: Number,
            required: true,
            min: 1
          },
          price: {
            type: Number,
            required: true
          },
          // name:{
          //   tye: String,
          //   required: true
          // }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    orderType: {
      type: String,
      enum: ["CARRYOUT", "DELIVERY"],
      required: true
    },
    status: {
      type: String,
       enum: ["PLACED", "DELIVERED","CANCELLED","RECEIVED"],
      default: "PLACED"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
