// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     price: "",
//     inventory: ""
//   });
//   const [editingId, setEditingId] = useState(null);

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/products/all`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "x-api-key": process.env.REACT_APP_API_KEY
//         }
//       });
//       setProducts(res.data.data);
//     } catch (error) {
//       alert("Failed to load products");
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitProduct = async () => {
//     try {
//       if (editingId) {
//         await axios.patch(
//           `${BASE_URL}/products/${editingId}/`,
//           form,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "x-api-key": process.env.REACT_APP_API_KEY
//             }
//           }
//         );
//       } else {
//         await axios.post(
//           `${BASE_URL}/products/add`,
//           form,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "x-api-key": process.env.REACT_APP_API_KEY
//             }
//           }
//         );
//       }

//       setForm({ name: "", category: "", price: "", inventory: "" });
//       setEditingId(null);
//       fetchProducts();
//     } catch (error) {
//       alert(error.response?.data?.message || "Operation failed");
//     }
//   };

//   const editProduct = (product) => {
//     setEditingId(product._id);
//     setForm({
//       name: product.name,
//       category: product.category,
//       price: product.price,
//       inventory: product.inventory
//     });
//   };

//   const toggleAvailability = async (id, isAvailable) => {
//     try {
//       await axios.patch(
//         `${BASE_URL}/products/${id}`,
//         { isAvailable: !isAvailable },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "x-api-key": process.env.REACT_APP_API_KEY
//           }
//         }
//       );
//       fetchProducts();
//     } catch {
//       alert("Failed to update availability");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       <Navbar />
// <div className="flex justify-between items-center mb-8">
//   <h1 className="text-3xl font-bold">🛠 Admin Dashboard</h1>

//   <button
//     onClick={() => navigate("/admin/orders")}
//     className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
//   >
//     📦 All Orders
//   </button>
// </div>

//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">🛠 Admin Dashboard</h1>

//           <button
//             onClick={() => navigate("/admin/orders")}
//             className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg"
//           >
//             View All Orders
//           </button>
//         </div>

//         {/* ADD / UPDATE PRODUCT */}
//         <div className="bg-gray-900 p-6 rounded-xl mb-10">
//           <h2 className="text-xl font-semibold mb-4">
//             {editingId ? "✏️ Update Product" : "➕ Add Product"}
//           </h2>

//           <div className="grid md:grid-cols-4 gap-4">
//             <input
//               name="name"
//               placeholder="Name"
//               value={form.name}
//               onChange={handleChange}
//               className="p-2 rounded bg-gray-800"
//             />
//             <input
//               name="category"
//               placeholder="Category"
//               value={form.category}
//               onChange={handleChange}
//               className="p-2 rounded bg-gray-800"
//             />
//             <input
//               name="price"
//               type="number"
//               placeholder="Price"
//               value={form.price}
//               onChange={handleChange}
//               className="p-2 rounded bg-gray-800"
//             />
//             <input
//               name="inventory"
//               type="number"
//               placeholder="Inventory"
//               value={form.inventory}
//               onChange={handleChange}
//               className="p-2 rounded bg-gray-800"
//             />
//           </div>

//           <button
//             onClick={submitProduct}
//             className="mt-4 px-6 py-2 bg-green-500 text-black font-semibold rounded-lg"
//           >
//             {editingId ? "Update Product" : "Add Product"}
//           </button>
//         </div>

//         {/* PRODUCT LIST */}
//         <div className="grid md:grid-cols-2 gap-6">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="bg-gray-900 p-5 rounded-xl"
//             >
//               <h3 className="text-lg font-semibold">
//                 {product.name}
//               </h3>

//               <p className="text-gray-400">
//                 {product.category} | ₹{product.price}
//               </p>

//               <p className="text-sm text-gray-500">
//                 Inventory: {product.inventory}
//               </p>

//               <p
//                 className={`text-sm mt-1 ${
//                   product.isAvailable
//                     ? "text-green-400"
//                     : "text-red-400"
//                 }`}
//               >
//                 {product.isAvailable ? "Available" : "Unavailable"}
//               </p>

//               <div className="flex space-x-4 mt-4">
//                 <button
//                   onClick={() => editProduct(product)}
//                   className="px-4 py-1 bg-blue-500 rounded"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   onClick={() =>
//                     toggleAvailability(
//                       product._id,
//                       product.isAvailable
//                     )
//                   }
//                   className="px-4 py-1 bg-red-500 rounded"
//                 >
//                   Toggle
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    inventory: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.REACT_APP_API_KEY
        }
      });
      setProducts(res.data.data);
    } catch (error) {
      showToast("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitProduct = async () => {
    if (!form.name || !form.category || !form.price || !form.inventory) {
      showToast("Please fill all fields", "error");
      return;
    }

    setActionLoading(true);
    try {
      if (editingId) {
        await axios.patch(
          `${BASE_URL}/products/${editingId}/`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": process.env.REACT_APP_API_KEY
            }
          }
        );
        showToast("Product updated successfully! ✓", "success");
      } else {
        await axios.post(
          `${BASE_URL}/products/add`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-api-key": process.env.REACT_APP_API_KEY
            }
          }
        );
        showToast("Product added successfully! 🎉", "success");
      }

      setForm({ name: "", category: "", price: "", inventory: "" });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      showToast(error.response?.data?.message || "Operation failed", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      inventory: product.inventory
    });
    showToast("Edit mode activated ✏️", "success");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", category: "", price: "", inventory: "" });
    showToast("Edit cancelled", "success");
  };

  const toggleAvailability = async (id, isAvailable, productName) => {
    setConfirmModal({
      title: isAvailable ? "Mark as Unavailable?" : "Mark as Available?",
      message: `Change availability status for "${productName}"?`,
      type: isAvailable ? "unavailable" : "available",
      onConfirm: async () => {
        setActionLoading(true);
        try {
          await axios.patch(
            `${BASE_URL}/products/${id}`,
            { isAvailable: !isAvailable },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": process.env.REACT_APP_API_KEY
              }
            }
          );
          await fetchProducts();
          showToast(
            isAvailable ? "Product marked as unavailable" : "Product is now available! 🎉",
            "success"
          );
          setConfirmModal(null);
        } catch {
          showToast("Failed to update availability", "error");
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

      <div className="max-w-7xl mx-auto px-6 py-12 mt-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 animate-fade-in">
          <div>
            <h1 className="text-5xl font-bold text-teal-800 mb-2">
              🛠 Admin Dashboard
            </h1>
            <p className="text-gray-600">
              {products.length === 0 ? "No products yet" : `Managing ${products.length} product${products.length > 1 ? 's' : ''}`}
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/orders")}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-xl hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
          >
            📦 View All Orders
          </button>
        </div>

        {/* Add/Update Product Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-cyan-200 p-8 mb-10 animate-scale-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId ? "✏️ Update Product" : "➕ Add New Product"}
            </h2>
            {editingId && (
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name
              </label>
              <input
                name="name"
                placeholder="e.g., Paneer Butter Masala"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 focus:border-teal-400 focus:outline-none transition-all duration-300 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <input
                name="category"
                placeholder="e.g., Main Course"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 focus:border-teal-400 focus:outline-none transition-all duration-300 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                name="price"
                type="number"
                placeholder="e.g., 250"
                value={form.price}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 focus:border-teal-400 focus:outline-none transition-all duration-300 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Inventory
              </label>
              <input
                name="inventory"
                type="number"
                placeholder="e.g., 50"
                value={form.inventory}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 focus:border-teal-400 focus:outline-none transition-all duration-300 text-gray-800"
              />
            </div>
          </div>

          <button
            onClick={submitProduct}
            disabled={actionLoading}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {actionLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                {editingId ? "Update Product ✓" : "Add Product +"}
              </>
            )}
          </button>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 animate-scale-in">
            <div className="bg-white rounded-3xl p-12 shadow-lg border border-cyan-200 max-w-md mx-auto">
              <div className="text-8xl mb-6">🍽️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                No products yet
              </h2>
              <p className="text-gray-600">
                Add your first product using the form above!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-200 overflow-hidden transform hover:scale-105"
                style={{
                  animation: `slideUp 0.4s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Product Header */}
                <div className="bg-gradient-to-r from-orange-50 to-rose-50 p-6 border-b border-orange-200">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {product.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                        product.isAvailable
                          ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white"
                          : "bg-gradient-to-r from-rose-400 to-pink-500 text-white"
                      }`}
                    >
                      {product.isAvailable ? "✓ Available" : "✗ Unavailable"}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-semibold">Category:</span> {product.category}
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">
                      ₹{product.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Stock:</span> {product.inventory}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 bg-gradient-to-r from-white to-cyan-50">
                  <div className="flex gap-3">
                    <button
                      onClick={() => editProduct(product)}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() =>
                        toggleAvailability(
                          product._id,
                          product.isAvailable,
                          product.name
                        )
                      }
                      className={`flex-1 px-4 py-3 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        product.isAvailable
                          ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                          : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                      }`}
                    >
                      {product.isAvailable ? "🚫 Disable" : "✓ Enable"}
                    </button>
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
                {confirmModal.type === "available" ? "✓" : "🚫"}
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
                  confirmModal.type === "available"
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

export default AdminDashboard;

