// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       <Navbar />

//       Hero Section
//       <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        
//         {/* Left */}
//         <div className="space-y-6">
//           <h1 className="text-5xl font-extrabold leading-tight">
//             Fresh Pizza <br />
//             <span className="text-yellow-400">Delivered Hot</span>
//           </h1>

//           <p className="text-gray-400 text-lg">
//             Order delicious pizzas, cold drinks and breads.
//             Fast, fresh and reliable — built for the HCL Hackathon.
//           </p>

//           <div className="space-x-4">
//             {/* <button className="px-6 py-3 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition">
//               Order Now
//             </button> */}

//           <Link
//   to="/menu"
//   className="text-gray-300 hover:text-white transition"
// >
//   Menu
// </Link>
//           </div>
//         </div>

//         {/* Right */}
//         <div className="flex justify-center">
//           <img
//             src="https://images.unsplash.com/photo-1601924582975-7f83c8e50b8d"
//             alt="Pizza"
//             className="rounded-2xl shadow-2xl w-full max-w-md"
//           />
//         </div>
//       </section>

//       {/* Features */}
//       <section className="bg-gray-900 py-16">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          
//           <div className="p-6 bg-gray-800 rounded-xl">
//             <h3 className="text-xl font-semibold mb-2">🔥 Freshly Baked</h3>
//             <p className="text-gray-400">
//               Made fresh with quality ingredients.
//             </p>
//           </div>

//           <div className="p-6 bg-gray-800 rounded-xl">
//             <h3 className="text-xl font-semibold mb-2">🚀 Fast Orders</h3>
//             <p className="text-gray-400">
//               Smooth ordering with real-time inventory.
//             </p>
//           </div>

//           <div className="p-6 bg-gray-800 rounded-xl">
//             <h3 className="text-xl font-semibold mb-2">🔒 Secure</h3>
//             <p className="text-gray-400">
//               OTP verification & secure APIs.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="text-center py-6 text-gray-500 text-sm">
//         © 2025 PizzaHub | HCL Hackathon Project
//       </footer>
//     </div>
//   );
// };
// export default Home;

// // import React, { useState } from 'react';
// // import { X, ShoppingCart, LogOut, User, Package, Pizza, Clock, Shield, Flame } from 'lucide-react';
// // import Navbar from '../components/Navbar';
// // const Home = () => {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
// //       <Navbar />
// //       {/* Hero Section */}
// //       <section className="max-w-7xl mx-auto px-6 py-20">
// //         <div className="grid md:grid-cols-2 gap-16 items-center">
          
// //           {/* Left Content */}
// //           <div className="space-y-8">
// //             <div className="inline-block">
// //               <span className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
// //                 🔥 Now Delivering Hot & Fresh
// //               </span>
// //             </div>

// //             <h1 className="text-6xl md:text-7xl font-black leading-tight">
// //               <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-orange-700 to-red-700">
// //                 Delicious Pizza
// //               </span>
// //               <br />
// //               <span className="text-amber-900">Delivered Fast</span>
// //             </h1>

// //             <p className="text-xl text-amber-800/80 leading-relaxed font-medium">
// //               Craving something amazing? Order delicious pizzas, refreshing drinks, 
// //               and freshly baked breads. Lightning-fast delivery, piping hot food.
// //             </p>

// //             <div className="flex flex-wrap gap-4">
// //               <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg hover:from-amber-500 hover:to-orange-500 transition-all shadow-2xl shadow-orange-600/40 border-2 border-amber-400/30 transform hover:scale-105">
// //                 Order Now 🍕
// //               </button>
// //               <button className="px-8 py-4 rounded-2xl bg-white/60 backdrop-blur-sm text-amber-900 font-bold text-lg hover:bg-white/80 transition-all border-2 border-amber-300/50 shadow-xl">
// //                 View Menu
// //               </button>
// //             </div>

// //             {/* Stats */}
// //             <div className="flex flex-wrap gap-8 pt-6">
// //               <div className="text-center">
// //                 <div className="text-3xl font-black text-amber-900">500+</div>
// //                 <div className="text-sm text-amber-700 font-semibold">Happy Customers</div>
// //               </div>
// //               <div className="text-center">
// //                 <div className="text-3xl font-black text-amber-900">4.8⭐</div>
// //                 <div className="text-sm text-amber-700 font-semibold">Average Rating</div>
// //               </div>
// //               <div className="text-center">
// //                 <div className="text-3xl font-black text-amber-900">30min</div>
// //                 <div className="text-sm text-amber-700 font-semibold">Avg Delivery</div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Image */}
// //           <div className="relative">
// //             <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-[3rem] transform rotate-6"></div>
// //             <div className="relative">
// //               <img
// //                 src="https://images.unsplash.com/photo-1601924582975-7f83c8e50b8d?w=800"
// //                 alt="Delicious Pizza"
// //                 className="rounded-[3rem] shadow-2xl w-full transform hover:scale-105 transition-transform duration-500 border-4 border-white"
// //               />
// //               <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl border-4 border-white">
// //                 <div className="flex items-center space-x-2">
// //                   <Clock className="w-5 h-5" />
// //                   <span className="font-bold">Fast Delivery</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="py-20 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100">
// //         <div className="max-w-7xl mx-auto px-6">
          
// //           <div className="text-center mb-16">
// //             <h2 className="text-5xl font-black text-amber-900 mb-4">Why Choose PizzaHub?</h2>
// //             <p className="text-xl text-amber-700 font-medium">Quality, Speed, and Taste - All in One Place</p>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-8">
            
// //             {/* Feature 1 */}
// //             <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-amber-200/50 hover:border-amber-400/50 transform hover:-translate-y-2">
// //               <div className="bg-gradient-to-br from-red-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
// //                 <Flame className="w-8 h-8 text-white" />
// //               </div>
// //               <h3 className="text-2xl font-bold text-amber-900 mb-3">Freshly Baked</h3>
// //               <p className="text-amber-800 font-medium leading-relaxed">
// //                 Every pizza is made fresh with premium ingredients. No frozen dough, 
// //                 just authentic Italian goodness.
// //               </p>
// //             </div>

// //             {/* Feature 2 */}
// //             <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-amber-200/50 hover:border-amber-400/50 transform hover:-translate-y-2">
// //               <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
// //                 <Clock className="w-8 h-8 text-white" />
// //               </div>
// //               <h3 className="text-2xl font-bold text-amber-900 mb-3">Lightning Fast</h3>
// //               <p className="text-amber-800 font-medium leading-relaxed">
// //                 Real-time order tracking and optimized delivery routes ensure 
// //                 your food arrives hot and on time.
// //               </p>
// //             </div>

// //             {/* Feature 3 */}
// //             <div className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-amber-200/50 hover:border-amber-400/50 transform hover:-translate-y-2">
// //               <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
// //                 <Shield className="w-8 h-8 text-white" />
// //               </div>
// //               <h3 className="text-2xl font-bold text-amber-900 mb-3">100% Secure</h3>
// //               <p className="text-amber-800 font-medium leading-relaxed">
// //                 OTP verification, encrypted payments, and secure checkout 
// //                 for complete peace of mind.
// //               </p>
// //             </div>

// //           </div>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="bg-gradient-to-r from-amber-900 via-orange-900 to-red-900 text-amber-100 py-12 border-t-2 border-amber-600/30">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <div className="text-center space-y-4">
// //             <div className="flex items-center justify-center space-x-3">
// //               <Pizza className="w-6 h-6 text-amber-300" />
// //               <span className="text-2xl font-black">PizzaHub</span>
// //             </div>
// //             <p className="text-amber-200 font-medium">
// //               Built with ❤️ for HCL Hackathon 2025
// //             </p>
// //             <p className="text-amber-300/60 text-sm font-semibold">
// //               © 2025 PizzaHub. All rights reserved.
// //             </p>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // // Cart Modal Component
// // const CartModal = ({ isOpen, onClose }) => {
// //   if (!isOpen) return null;

// //   const cartItems = [
// //     { id: 1, name: "Margherita Pizza", price: 12.99, qty: 2 },
// //     { id: 2, name: "Pepperoni Pizza", price: 15.99, qty: 1 },
// //     { id: 3, name: "Coca Cola", price: 2.99, qty: 3 }
// //   ];

// //   const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

// //   return (
// //     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //       <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border-4 border-amber-200/50">
        
// //         {/* Header */}
// //         <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 flex justify-between items-center">
// //           <div className="flex items-center space-x-3">
// //             <ShoppingCart className="w-6 h-6 text-white" />
// //             <h2 className="text-2xl font-black text-white">Your Cart</h2>
// //           </div>
// //           <button 
// //             onClick={onClose}
// //             className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-all"
// //           >
// //             <X className="w-6 h-6 text-white" />
// //           </button>
// //         </div>

// //         {/* Cart Items */}
// //         <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
// //           {cartItems.map(item => (
// //             <div key={item.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 flex justify-between items-center border-2 border-amber-200/50 shadow-lg">
// //               <div>
// //                 <h3 className="font-bold text-amber-900 text-lg">{item.name}</h3>
// //                 <p className="text-amber-700 font-medium">Qty: {item.qty}</p>
// //               </div>
// //               <div className="text-right">
// //                 <p className="text-2xl font-black text-amber-900">${(item.price * item.qty).toFixed(2)}</p>
// //                 <p className="text-sm text-amber-600 font-semibold">${item.price} each</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Footer */}
// //         <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 border-t-2 border-amber-300/50">
// //           <div className="flex justify-between items-center mb-4">
// //             <span className="text-xl font-bold text-amber-900">Total:</span>
// //             <span className="text-3xl font-black text-amber-900">${total.toFixed(2)}</span>
// //           </div>
// //           <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg hover:from-amber-500 hover:to-orange-500 transition-all shadow-xl border-2 border-amber-400/30">
// //             Proceed to Checkout 🎉
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// //  export default Home;

import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Shield, ChevronRight, LogOut, Zap, Sparkles, TrendingUp, Lock, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const token = true; // Replace with actual: localStorage.getItem("token")
  const user = { name: "John", role: "ADMIN" }; // Replace with: JSON.parse(localStorage.getItem("user")) || {}

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // navigate("/login");
    console.log("Logout clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100">
      
      {/* Navbar */}


    
<Navbar/>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full border-2 border-cyan-300 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
              <span className="text-sm font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>New: Lightning Fast Delivery</span>
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              <span className="text-gray-800">
                Fresh Pizza
              </span>
              <br/>
              <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 bg-clip-text text-transparent">
                Delivered Hot
              </span>
            </h1>

            <p className="text-xl text-gray-700 leading-relaxed">
              Experience the perfect blend of <span className="text-cyan-600 font-bold">technology</span> and <span className="text-teal-600 font-bold">taste</span>. 
              Order delicious pizzas, cold drinks and breads with real-time tracking.
            </p>

            <div className="flex space-x-4 pt-4">
              <a href="/menu" className="group relative px-8 py-4 rounded-2xl overflow-hidden hover:scale-105 transition-transform shadow-xl hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 blur-xl opacity-50"></div>
                <span className="relative text-white font-bold text-lg flex items-center space-x-2">
                  <span>Explore Menu</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </a>

              <a href="#features" className="group px-8 py-4 rounded-2xl bg-white border-2 border-cyan-300 hover:border-cyan-400 transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="text-cyan-700 font-bold text-lg flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Learn More</span>
                </span>
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-300 to-cyan-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative hover:scale-105 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800"
                alt="Pizza"
                className="rounded-3xl shadow-2xl w-full border-4 border-white"
              />
              
              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-amber-400 to-orange-500 text-white px-6 py-3 rounded-2xl font-bold shadow-xl animate-bounce">
                🔥 Hot Deal
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-emerald-400 to-teal-500 text-white px-6 py-3 rounded-2xl font-bold shadow-xl">
                ⚡ Fast Delivery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600">Built for the HCL Hackathon with cutting-edge tech</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="group bg-white rounded-3xl p-8 border-2 border-teal-200 hover:border-teal-400 transition-all hover:scale-105 hover:shadow-2xl shadow-lg">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-400 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                  <span className="text-4xl">🔥</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Freshly Baked</h3>
              <p className="text-gray-600 leading-relaxed">
                Made fresh with quality ingredients in our state-of-the-art kitchen.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 border-2 border-cyan-200 hover:border-cyan-400 transition-all hover:scale-105 hover:shadow-2xl shadow-lg">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Fast Orders</h3>
              <p className="text-gray-600 leading-relaxed">
                Smooth ordering with real-time inventory and lightning-fast checkout.
              </p>
            </div>

            <div className="group bg-white rounded-3xl p-8 border-2 border-sky-200 hover:border-sky-400 transition-all hover:scale-105 hover:shadow-2xl shadow-lg">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Secure</h3>
              <p className="text-gray-600 leading-relaxed">
                OTP verification & secure APIs to protect your data and transactions.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-t-2 border-cyan-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-4">
            <span className="text-2xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              PizzaHub
            </span>
          </div>
          <p className="text-gray-600 font-medium">
            © 2025 PizzaHub | HCL Hackathon Project
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;