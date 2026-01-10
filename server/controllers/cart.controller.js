const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.body.productId;
    const quantity = Number(req.body.quantity) || 1;

    if (quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({
      user: userId,
      status: "ACTIVE"
    });

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    let existingQuantity = 0;
    if (itemIndex > -1) {
      existingQuantity = cart.items[itemIndex].quantity;
    }

    // 🔥 MAIN FIX
    if (existingQuantity + quantity > product.inventory) {
      return res.status(400).json({
        message: `Only ${product.inventory - existingQuantity} items left in stock`
      });
    }

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } 
    else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      });
    }

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    await cart.save();

    res.json({
      message: "Item added to cart",
      cart
    });
  } catch (error) {
    res.status(500).json({ message: "Cart update failed" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.userId,
      status: "ACTIVE"
    }).populate("items.product");

    res.json(cart || {});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: userId,
      status: "ACTIVE"
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    await cart.save();

    res.json({
      message: "Item removed from cart",
      cart
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};

exports.reduceQuantity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.body.productId;
    const reduceBy = Number(req.body.reduceBy) || 1;

    if (reduceBy <= 0) {
      return res.status(400).json({ message: "Invalid reduce value" });
    }

    const cart = await Cart.findOne({
      user: userId,
      status: "ACTIVE"
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    cart.items[itemIndex].quantity -= reduceBy;

    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    await cart.save();

    res.json({
      message: "Cart updated successfully",
      cart
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to reduce quantity" });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOneAndDelete({
      user: userId,
      status: "ACTIVE"
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
};

