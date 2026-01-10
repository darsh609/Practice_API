
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, LogOut, User, Package, Pizza, Clock, Shield, Flame, Zap, ChevronRight, Sparkles } from 'lucide-react';
import LogoutConfirmationModal from './LogoutConfirmationModal'; // adjust path as needed
const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [scrolled, setScrolled] = useState(false);
const [showLogoutModal, setShowLogoutModal] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  console.log("User logged out, token removed from localStorage");
  setShowLogoutModal(false); // Add this line
  navigate("/login");
};

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-xl shadow-cyan-500/10' 
        : 'bg-white/70 backdrop-blur-md'
    }`}>
      {/* Animated top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-teal-500 to-cyan-500 p-3 rounded-2xl transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                <Pizza className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              PizzaHub
            </span>
          </Link>

          {/* Welcome Message */}
          <div>
            {token ? (
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-400 rounded-full blur-sm opacity-40 group-hover:opacity-70 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-teal-100 to-cyan-100 p-2 rounded-full">
                    <User className="w-5 h-5 text-cyan-700" />
                  </div>
                </div>
                <span className="text-gray-700 font-medium">
                  Heyyy, <span className="text-cyan-700 font-bold">{user?.name}</span>
                </span>
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              </div>
            ) : null}   
          </div>

          {/* ADMIN ONLY */}
          {user?.role === "ADMIN" && (
            <Link
              to="/admin"
              className="group relative px-5 py-2.5 rounded-xl overflow-hidden transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <span className="relative flex items-center space-x-2 text-white font-bold">
                <Shield className="w-4 h-4" />
                <span>Admin-Panel</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          )}


          {/* Auth Buttons */}
        

          {/* Cart */}
          <Link to="/cart" className="group relative hover:scale-110 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-md opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 px-5 py-2.5 rounded-2xl flex items-center space-x-2 shadow-lg">
              <ShoppingCart className="w-5 h-5 text-white group-hover:animate-bounce" />
              <span className="text-white font-bold">Cart</span>
            </div>
          </Link>

           {true && (
            <Link
              to="/your-orders"
              className="group relative px-5 py-2.5 rounded-xl overflow-hidden transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-orange-400 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-orange-400 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <span className="relative flex items-center space-x-2 text-white font-bold">
                <Shield className="w-4 h-4" />
                <span>My Orders</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          )}

            <div className="flex items-center space-x-3">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="group relative px-6 py-2.5 rounded-xl overflow-hidden hover:scale-105 transition-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-100 to-cyan-100 group-hover:from-teal-200 group-hover:to-cyan-200 transition-all"></div>
                  <span className="relative text-teal-700 group-hover:text-teal-800 font-semibold transition-colors">
                    Login
                  </span>
                </Link>

                <Link
                  to="/signup"
                  className="group relative px-6 py-2.5 rounded-xl overflow-hidden hover:scale-105 transition-transform"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 blur-lg opacity-50"></div>
                  <span className="relative text-white font-bold flex items-center space-x-2">
                    <span>Signup</span>
                    <Zap className="w-4 h-4 group-hover:animate-bounce" />
                  </span>
                </Link>
              </>
            ) : (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="group relative px-6 py-2.5 rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 blur-md opacity-40"></div>
                <span className="relative text-white font-bold flex items-center space-x-2">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </span>
              </button>
            )}
          </div>



        </div>
      </div>

      <LogoutConfirmationModal 
  isOpen={showLogoutModal}
  onClose={() => setShowLogoutModal(false)}
  onConfirm={handleLogout}
/>
    </nav>
  );
};

export default Navbar;