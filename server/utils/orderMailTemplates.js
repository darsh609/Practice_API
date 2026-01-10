
exports.orderPlacedTemplate = (order) => `
  <div style="font-family: Arial; padding:20px">
    <h2 style="color:#e63946">🍕 Order Placed Successfully!</h2>
    <p>Your order <b>${order._id}</b> has been placed.</p>

    <h3>Order Summary</h3>
    <ul>
      ${order.items.map(
        item => `
          <li>${item.quantity} × ${item.product.name} —> ₹${item.price}</li>
        `
      ).join("")}
    </ul>

    <h3>Total: ₹${order.totalAmount}</h3>
    <p>Status: <b>${order.status}</b></p>

    <p>Thanks for ordering with us 🙌</p>
  </div>
`;

exports.orderReceivedTemplate = (order) =>
   `
  <div style="font-family: Arial, sans-serif; padding:20px; line-height:1.6">
    
    <h2 style="color:#2a9d8f">📦 Order Delivered Successfully</h2>

    <p>
      Hi,<br/>
      We’re happy to inform you that your order 
      <b>#${order._id}</b> has been <b>successfully delivered</b>.
    </p>

    <h3>Order Details</h3>
    <p>
      <b>Total Paid:</b> ₹${order.totalAmount}<br/>
      <b>Status:</b> Delivered
    </p>

    <p>
      We hope you enjoyed your meal 🍕<br/>
      Thank you for ordering with us!
    </p>

    <p style="font-size:12px; color:#777">
      If you have any issues with your order, please contact our support team.
    </p>

  </div>
`;

exports.orderCancelledTemplate = (order) => `
  <div style="font-family: Arial; padding:20px">
    <h2 style="color:#e63946">❌ Order Cancelled</h2>
    <p>Your order <b>#${order._id}</b> has been cancelled.</p>

    <h3>Order Summary</h3>
    <ul>
      ${order.items.map(
        item => `
          <li>${item.quantity} × ${item.product.name}</li>
        `
      ).join("")}
    </ul>

    <p>Total Amount: ₹${order.totalAmount}</p>

    <p>If this was a mistake, you can place a new order anytime 🍕</p>
  </div>
`;

