import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchMenu();
    fetchCart();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products/menu`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.REACT_APP_API_KEY
        }
      });
      setProducts(res.data.data);
    } catch (error) {
      showToast("Failed to fetch menu", "error");
    } finally {
      setLoading(false);
    }
  };

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
      console.error("Failed to fetch cart");
    }
  };

  const getItemQty = (productId) => {
    if (!cart?.items) return 0;
    const item = cart.items.find(
      (i) => i.product._id === productId
    );
    return item ? item.quantity : 0;
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
        action === "increase" ? "Item added to cart! 🎉" : "Item removed from cart",
        "success"
      );
    } catch (error) {
      showToast(error.response?.data?.message || "Update failed", "error");
    }
  };

  const handleAddToCart = (item) => {
    setConfirmModal({
      title: "Add to Cart?",
      message: `Add ${item.name} to your cart for ₹${item.price}?`,
      onConfirm: () => {
        updateQty(item._id, "increase");
        setConfirmModal(null);
      },
      onCancel: () => setConfirmModal(null)
    });
  };

  const categories = ["All", "Pizza", "Drink", "Bread"];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-sky-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 mt-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-teal-800 mb-3 tracking-tight">
            🍕 Our Delicious Menu
          </h1>
          <p className="text-gray-600 text-lg">
            Fresh ingredients, amazing flavors
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-teal-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-teal-50 border-2 border-teal-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 border-t-teal-500"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No items found in this category</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((item, index) => {
              const qty = getItemQty(item._id);

              return (
                <div
                  key={item._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-cyan-200 transform hover:-translate-y-2"
                  style={{
                    animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="relative p-6">
                    {item.inventory > 0 && item.inventory <= 5 && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                        Only {item.inventory} left!
                      </div>
                    )}

                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                        {item.name}
                      </h2>

                      <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                        ₹{item.price}
                      </p>

                      <p className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        Stock: {item.inventory}
                      </p>
                    </div>

                    {item.inventory === 0 ? (
                      <button
                        disabled
                        className="w-full py-3 bg-gray-200 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
                      >
                        Out of Stock 😢
                      </button>
                    ) : qty === 0 ? (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl hover:from-teal-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Add to Cart 🛒
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-3 border-2 border-teal-200">
                        <button
                          onClick={() => updateQty(item._id, "decrease")}
                          className="w-10 h-10 bg-white text-teal-600 font-bold rounded-lg hover:bg-teal-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                        >
                          −
                        </button>

                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-bold text-teal-700">
                            {qty}
                          </span>
                          <span className="text-xs text-gray-600">in cart</span>
                        </div>

                        <button
                          onClick={() => updateQty(item._id, "increase")}
                          disabled={qty >= item.inventory}
                          className={`w-10 h-10 font-bold rounded-lg transition-all duration-300 shadow-md transform ${
                            qty >= item.inventory
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white text-teal-600 hover:bg-teal-100 hover:shadow-lg hover:scale-110"
                          }`}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in border-2 border-cyan-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {confirmModal.title}
            </h3>
            <p className="text-gray-600 mb-6">
              {confirmModal.message}
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmModal.onCancel}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg"
              >
                Confirm ✓
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

export default Menu;