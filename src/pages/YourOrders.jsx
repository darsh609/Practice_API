// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// const YourOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user")); // { role }
//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/orders/my-orders`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "x-api-key": process.env.REACT_APP_API_KEY
//         }
//       });

//       setOrders(res.data.orders); // IMPORTANT
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load orders");
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     try {
//       await axios.put(
//         `${BASE_URL}/orders/${orderId}/cancel`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "x-api-key": process.env.REACT_APP_API_KEY
//           }
//         }
//       );
//       fetchOrders();
//     } catch (err) {
//       alert(err.response?.data?.message || "Cancel failed");
//     }
//   };

//   const markReceived = async (orderId) => {
//     try {
//       await axios.put(
//         `${BASE_URL}/orders/${orderId}/received`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "x-api-key": process.env.REACT_APP_API_KEY
//           }
//         }
//       );
//       fetchOrders();
//     } catch (err) {
//       alert("Failed to mark order as received");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       <Navbar />

//       <div className="max-w-6xl mx-auto px-6 py-10">
//         <h1 className="text-3xl font-bold mb-8">📦 Your Orders</h1>

//         {orders.length === 0 ? (
//           <p className="text-gray-400">No orders found</p>
//         ) : (
//           orders.map((order) => (
//             <div
//               key={order._id}
//               className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6"
//             >
//               {/* Header */}
//               <div className="flex justify-between items-center mb-4">
//                 <div className="text-sm text-gray-400">
//                   <p>Order ID: {order._id}</p>
//                   <p>
//                     Placed on:{" "}
//                     {new Date(order.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                     order.status === "PLACED"
//                       ? "bg-yellow-500 text-black"
//                       : order.status === "RECEIVED"
//                       ? "bg-green-600"
//                       : "bg-red-600"
//                   }`}
//                 >
//                   {order.status}
//                 </span>
//               </div>

//               {/* Items */}
//               <div className="space-y-2">
//                 {order.items.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex justify-between text-gray-300"
//                   >
//                     <span>
//                       {item.product?.name || "Item"} × {item.quantity}
//                     </span>
//                     <span>₹{item.price * item.quantity}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Footer */}
//               <div className="flex justify-between items-center mt-6">
//                 <h2 className="text-lg font-semibold">
//                   Total: ₹{order.totalAmount}
//                 </h2>

//                 <div className="flex gap-3">
//                   {/* Cancel (user + admin) */}
//                   {order.status === "PLACED" && (
//                     <button
//                       onClick={() => cancelOrder(order._id)}
//                       className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
//                     >
//                       Cancel Order
//                     </button>
//                   )}

//                   {/* Admin only */}
//                   {user?.role === "ADMIN" &&
//                     order.status === "PLACED" && (
//                       <button
//                         onClick={() => markReceived(order._id)}
//                         className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
//                       >
//                         Mark Received
//                       </button>
//                     )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default YourOrders;
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const YourOrders = () => {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.REACT_APP_API_KEY
        }
      });
      setOrders(res.data.orders);
    } catch (err) {
      showToast("Failed to load orders", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const cancelOrder = async (orderId, orderTotal) => {
    setConfirmModal({
      title: "Cancel Order?",
      message: `Are you sure you want to cancel this order of ₹${orderTotal}?`,
      type: "cancel",
      onConfirm: async () => {
        setActionLoading(true);
        try {
          await axios.put(
            `${BASE_URL}/orders/${orderId}/cancel`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": process.env.REACT_APP_API_KEY
              }
            }
          );
          await fetchOrders();
          showToast("Order cancelled successfully", "success");
          setConfirmModal(null);
        } catch (err) {
          showToast(err.response?.data?.message || "Cancel failed", "error");
          setConfirmModal(null);
        } finally {
          setActionLoading(false);
        }
      },
      onCancel: () => setConfirmModal(null)
    });
  };

  const markReceived = async (orderId, orderTotal) => {
    setConfirmModal({
      title: "Mark as Delivered?",
      message: `Confirm that this order of ₹${orderTotal} has been delivered successfully.`,
      type: "received",
      onConfirm: async () => {
        setActionLoading(true);
        try {
          await axios.put(
            `${BASE_URL}/orders/${orderId}/received`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": process.env.REACT_APP_API_KEY
              }
            }
          );
          await fetchOrders();
          showToast("Order marked as delivered successfully", "success");
          setConfirmModal(null);
        } catch (err) {
          showToast("Failed to mark order as delivered", "error");
          setConfirmModal(null);
        } finally {
          setActionLoading(false);
        }
      },
      onCancel: () => setConfirmModal(null)
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-sky-100">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 border-t-teal-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-sky-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10 animate-fade-in">
          <div>
            <h1 className="text-5xl font-bold text-teal-800 mb-2">
              📦 Your Orders
            </h1>
            <p className="text-gray-600">
              {orders.length === 0 ? "No orders yet" : `${orders.length} order${orders.length > 1 ? 's' : ''} found`}
            </p>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full"></div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 animate-scale-in">
            <div className="bg-white rounded-3xl p-12 shadow-lg border border-cyan-200 max-w-md mx-auto">
              <div className="text-8xl mb-6">📦</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                No orders yet
              </h2>
              <p className="text-gray-600 mb-8">
                Start ordering some delicious food!
              </p>
              <button
                onClick={() => window.location.href = '/menu'}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Browse Menu 🍕
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-200 overflow-hidden"
                style={{
                  animation: `slideUp 0.4s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 border-b border-cyan-200">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Order ID: <span className="font-mono text-teal-700">{order._id}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        📅 {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${
                        order.status === "PLACED"
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                          : order.status === "RECEIVED"
                          ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white"
                          : "bg-gradient-to-r from-rose-400 to-pink-500 text-white"
                      }`}
                    >
                      {order.status === "PLACED" ? "🕐 Placed" : order.status === "RECEIVED" ? "✓ Delivered" : "✗ Cancelled"}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-200"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🍽️</span>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {item.product?.name || "Item"}
                            </p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-bold text-teal-600">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-white to-cyan-50 p-6 border-t border-cyan-200">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-gray-600 mb-1">Total Amount</p>
                      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                        ₹{order.totalAmount}
                      </h2>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      {/* Cancel Button */}
                      {order.status === "PLACED" && (
                        <button
                          onClick={() => cancelOrder(order._id, order.totalAmount)}
                          className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Cancel Order ✗
                        </button>
                      )}

                      {/* Admin Mark Received Button */}
                      {user?.role === "ADMIN" && order.status === "PLACED" && (
                        <button
                          onClick={() => markReceived(order._id, order.totalAmount)}
                          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Mark Delivered✓
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in border-2 border-cyan-200">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">
                {confirmModal.type === "received" ? "✓" : "✗"}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {confirmModal.title}
              </h3>
              <p className="text-gray-600">
                {confirmModal.message}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={confirmModal.onCancel}
                disabled={actionLoading}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={confirmModal.onConfirm}
                disabled={actionLoading}
                className={`flex-1 py-3 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  confirmModal.type === "received"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                    : "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                }`}
              >
                {actionLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  "Confirm ✓"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 animate-slide-in">
          <div
            className={`rounded-xl shadow-2xl p-4 flex items-center gap-3 border-2 ${
              toast.type === "success"
                ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-400 text-emerald-800"
                : "bg-gradient-to-r from-rose-50 to-pink-50 border-rose-400 text-rose-800"
            }`}
          >
            <span className="text-2xl">
              {toast.type === "success" ? "✓" : "⚠"}
            </span>
            <p className="font-semibold">{toast.message}</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default YourOrders;