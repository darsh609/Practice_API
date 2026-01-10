import React from 'react';
import { X, LogOut, AlertTriangle } from 'lucide-react';

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform animate-in zoom-in-95 duration-300">
        {/* Gradient Border */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors group"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
        </button>

        <div className="p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-400 rounded-full blur-xl opacity-40"></div>
              <div className="relative bg-gradient-to-br from-rose-100 to-pink-100 p-4 rounded-full">
                <AlertTriangle className="w-10 h-10 text-rose-600" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Logout Confirmation
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Are you sure you want to logout? You'll need to sign in again to access your account.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all hover:scale-105"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 group relative px-6 py-3 rounded-xl overflow-hidden hover:scale-105 transition-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 blur-lg opacity-50"></div>
              <span className="relative text-white font-bold flex items-center justify-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>Yes, Logout</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;