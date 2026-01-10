// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// const Cart = () => {
//   const [cart, setCart] = useState(null);
//   const token = localStorage.getItem("token");
//   const BASE_URL = process.env.REACT_APP_BASE_URL;
// const navigate = useNavigate();
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/cart`, {
//             // withCredentials: true,
//         headers: {     
//            Authorization: `Bearer ${token}`,
//           "x-api-key": process.env.REACT_APP_API_KEY
//         }
//       });
//       console.log(res.data);
//       setCart(res.data);
//     //   console.log("--->", cart);
//     } catch (error) {
//       console.error("Failed to load cart");
//     }
//   };

// //   const updateQty = async (productId, action) => {
// //     try {
// //       await axios.post(
// //         `${BASE_URL}/cart/reduce`,
// //         { productId, action },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "x-api-key": process.env.REACT_APP_API_KEY
// //           }
// //         },
        
// //       );
// //       fetchCart();
// //     } catch (error) {
// //       alert(error.response?.data?.message || "Update failed");
// //     }
// //   };

//   const updateQty = async (productId, action) => {
//   try {
//     const endpoint =
//       action === "increase"
//         ? `${BASE_URL}/cart/add`
//         : `${BASE_URL}/cart/reduce`;

//     await axios.post(
//       endpoint,
//       { productId },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "x-api-key": process.env.REACT_APP_API_KEY
//         }
//       }
//     );

//     fetchCart();
//   } catch (error) {
//     alert(error.response?.data?.message || "Update failed");
//   }
// };


//   const removeItem = async (productId) => {
//     try {
//       await axios.delete(`${BASE_URL}/cart/remove/${productId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "x-api-key": process.env.REACT_APP_API_KEY
//         }
//       });
//       fetchCart();
//     } catch (error) {
//       alert("Remove failed");
//     }
//   };
//   const clearCart = async () => {
//   try {
//     await axios.delete(`${BASE_URL}/cart/clear`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "x-api-key": process.env.REACT_APP_API_KEY
//       }
//     });
// navigate('/menu')
//     fetchCart();
//   } catch (error) {
//     alert("Failed to clear cart");
//   }
// };


//   const placeOrder = async () => {
//     try {
//       await axios.post(
//         `${BASE_URL}/orders`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "x-api-key": process.env.REACT_APP_API_KEY
//           }
//         }
//       );
//       alert("Order placed successfully 🎉");
//       navigate('/your-orders')
//       fetchCart();
//     } catch (error) {
//       alert(error.response?.data?.message || "Order failed");
//     }
//   };

//   if (!cart) {
//     return (
//       <div className="min-h-screen bg-gray-950 text-white">
//         <Navbar />
//         <p className="text-center mt-20">Loading cart...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-6 py-12">
//         <h1 className="text-3xl font-bold mb-8">🛒 Your Cart</h1>

//         {cart && (!cart.items || cart.items.length === 0) ? (
//           <p className="text-gray-400">Your cart is empty</p>
//         ) : (
//           <>
//             {cart?.items?.map((item) => (
//               <div
//                 key={item.product._id}
//                 className="flex justify-between items-center bg-gray-900 p-4 rounded-lg mb-4"
//               >
//                 <div>
//                   <h2 className="font-semibold">{item.product.name}</h2>
//                   <p className="text-gray-400">
//                     ₹{item.product.price} × {item.quantity}
//                   </p>
//                 </div>

//                 <div className="flex items-center space-x-4">
//                   <button
//   onClick={() => updateQty(item.product._id, "decrease")}
//   className="px-3 py-1 bg-gray-700 rounded"
// >
//   -
// </button>

// <span>{item.quantity}</span>

// <button
//   onClick={() => updateQty(item.product._id, "increase")}
//   className="px-3 py-1 bg-gray-700 rounded"
// >
//   +
// </button>

//                   <button
//                     onClick={() => removeItem(item.product._id)}
//                     className="text-red-400 hover:text-red-300"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {/* <div className="mt-8 flex justify-between items-center">
//               <h2 className="text-xl font-bold">
//                 Total: ₹{cart.totalAmount}
//               </h2>

//               <button
//                 onClick={placeOrder}
//                 className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
//               >
//                 Place Order
//               </button>
//             </div> */}

//             <div className="mt-8 flex justify-between items-center">
//   <h2 className="text-xl font-bold">
//     Total: ₹{cart.totalAmount}
//   </h2>

//   <div className="space-x-4">
//     <button
//       onClick={clearCart}
//       className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500"
//     >
//       Clear Cart
//     </button>

//     <button
//       onClick={placeOrder}
//       className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400"
//     >
//       Place Order
//     </button>
//   </div>
// </div>

//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;


import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Cart = () => {
 
const [actionLoading, setActionLoading] = useState(false); // ADD THIS LINE
  const [cart, setCart] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.REACT_APP_API_KEY
        }
      });
      setCart(res.data);
    } catch (error) {
      showToast("Failed to load cart", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateQty = async (productId, action) => {
    try {
      const endpoint =
        action === "increase"
          ? `${BASE_URL}/cart/add`
          : `${BASE_URL}/cart/reduce`;

      await axios.post(
        endpoint,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.REACT_APP_API_KEY
          }
        }
      );

      await fetchCart();
      showToast(
        action === "increase" ? "Quantity increased! +" : "Quantity decreased",
        "success"
      );
    } catch (error) {
      showToast(error.response?.data?.message || "Update failed", "error");
    }
  };

  const removeItem = async (productId, productName) => {
    setConfirmModal({
      title: "Remove Item?",
      message: `Remove ${productName} from your cart?`,
      type: "remove",
      onConfirm: async () => {
        try {
          await axios.delete(`${BASE_URL}/cart/remove/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": process.env.REACT_APP_API_KEY
            }
          });
          await fetchCart();
          showToast("Item removed from cart", "success");
          setConfirmModal(null);
        } catch (error) {
          showToast("Remove failed", "error");
          setConfirmModal(null);
        }
      },
      onCancel: () => setConfirmModal(null)
    });
  };

  // const clearCart = async () => {
  //   setConfirmModal({
  //     title: "Clear Cart?",
  //     message: "Are you sure you want to remove all items from your cart?",
  //     type: "clear",
  //     onConfirm: async () => {
  //       try {
  //         await axios.delete(`${BASE_URL}/cart/clear`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "x-api-key": process.env.REACT_APP_API_KEY
  //           }
  //         });
  //         showToast("Cart cleared!", "success");
  //         setConfirmModal(null);
  //         navigate('/menu');
  //       } catch (error) {
  //         showToast("Failed to clear cart", "error");
  //         setConfirmModal(null);
  //       }
  //     },
  //     onCancel: () => setConfirmModal(null)
  //   });
  // };
const clearCart = async () => {
  setConfirmModal({
    title: "Clear Cart?",
    message: "Are you sure you want to remove all items from your cart?",
    type: "clear",
    onConfirm: async () => {
      setActionLoading(true); // ADD THIS
      try {
        await axios.delete(`${BASE_URL}/cart/clear`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.REACT_APP_API_KEY
          }
        });
        showToast("Cart cleared!", "success");
        setConfirmModal(null);
        navigate('/menu');
      } catch (error) {
        showToast("Failed to clear cart", "error");
        setConfirmModal(null);
      } finally {
        setActionLoading(false); // ADD THIS
      }
    },
    onCancel: () => setConfirmModal(null)
  });
};
  // const placeOrder = async () => {
  //   setConfirmModal({
  //     title: "Place Order?",
  //     message: `Confirm your order for ₹${cart?.totalAmount}?`,
  //     type: "order",
  //     onConfirm: async () => {
  //       try {
  //         await axios.post(
  //           `${BASE_URL}/orders`,
  //           {},
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //               "x-api-key": process.env.REACT_APP_API_KEY
  //             }
  //           }
  //         );
  //         showToast("Order placed successfully! 🎉", "success");
  //         setConfirmModal(null);
  //         setTimeout(() => navigate('/your-orders'), 1500);
  //       } catch (error) {
  //         showToast(error.response?.data?.message || "Order failed", "error");
  //         setConfirmModal(null);
  //       }
  //     },
  //     onCancel: () => setConfirmModal(null)
  //   });
  // };

  const placeOrder = async () => {
  setConfirmModal({
    title: "Place Order?",
    message: `Confirm your order for ₹${cart?.totalAmount}?`,
    type: "order",
    onConfirm: async () => {
      setActionLoading(true); // ADD THIS
      try {
        await axios.post(
          `${BASE_URL}/orders`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": process.env.REACT_APP_API_KEY
            }
          }
        );
        showToast("Order placed successfully! 🎉", "success");
        setConfirmModal(null);
        setTimeout(() => navigate('/your-orders'), 1500);
      } catch (error) {
        showToast(error.response?.data?.message || "Order failed", "error");
        setConfirmModal(null);
      } finally {
        setActionLoading(false); // ADD THIS
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

  const isEmpty = !cart || !cart.items || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-sky-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10 animate-fade-in">
          <div>
            <h1 className="text-5xl font-bold text-teal-800 mb-2">
              🛒 Your Cart
            </h1>
            <p className="text-gray-600">
              {isEmpty ? "No items yet" : `${cart.items.length} item${cart.items.length > 1 ? 's' : ''} in cart`}
            </p>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full"></div>
        </div>

        {isEmpty ? (
          <div className="text-center py-20 animate-scale-in">
            <div className="bg-white rounded-3xl p-12 shadow-lg border border-cyan-200 max-w-md mx-auto">
              <div className="text-8xl mb-6">🛒</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Add some delicious items to get started!
              </p>
              <button
                onClick={() => navigate('/menu')}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Browse Menu 🍕
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.items.map((item, index) => (
                <div
                  key={item.product._id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-200 transform hover:-translate-y-1"
                  style={{
                    animation: `slideUp 0.4s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {item.product.name}
                      </h2>
                      <div className="flex items-center gap-4">
                        <p className="text-gray-600">
                          <span className="font-semibold text-teal-600">₹{item.product.price}</span> × {item.quantity}
                        </p>
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                          Subtotal: ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-2 border-2 border-teal-200">
                        <button
                          onClick={() => updateQty(item.product._id, "decrease")}
                          className="w-10 h-10 bg-white text-teal-600 font-bold rounded-lg hover:bg-teal-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                        >
                          −
                        </button>

                        <span className="mx-4 text-2xl font-bold text-teal-700 min-w-[40px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQty(item.product._id, "increase")}
                          className="w-10 h-10 bg-white text-teal-600 font-bold rounded-lg hover:bg-teal-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product._id, item.product.name)}
                        className="px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-600 font-semibold rounded-lg hover:from-rose-200 hover:to-pink-200 transition-all duration-300 border border-rose-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-white to-cyan-50 rounded-2xl p-8 shadow-xl border-2 border-cyan-200 animate-fade-in">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-gray-600 mb-2">Total Amount</p>
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                    ₹{cart.totalAmount}
                  </h2>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={clearCart}
                    className="px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Clear Cart 🗑️
                  </button>

                  <button
                    onClick={placeOrder}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Place Order 🎉
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      {/* {confirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in border-2 border-cyan-200">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">
                {confirmModal.type === "order" ? "🎉" : confirmModal.type === "clear" ? "🗑️" : "❌"}
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
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className={`flex-1 py-3 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                  confirmModal.type === "order"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                    : "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                }`}
              >
                Confirm ✓
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Confirmation Modal */}
{confirmModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in border-2 border-cyan-200">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">
          {confirmModal.type === "order" ? "🎉" : confirmModal.type === "clear" ? "🗑️" : "❌"}
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
            confirmModal.type === "order"
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

export default Cart;