// import { useState } from "react";
// import api from "../services/api";

// const Signup = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const sendOtp = async () => {
//     try {
//       await api.post("/otp/send", { email: form.email });
//       alert("OTP sent to email");
//       localStorage.setItem("signupData", JSON.stringify(form));
//       window.location.href = "/verify";
//     } catch (err) {
//       alert("Failed to send OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//       <div className="bg-gray-900 p-8 rounded-xl w-96 space-y-4">
//         <h2 className="text-2xl font-bold text-white text-center">
//           Signup
//         </h2>

//         <input
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-gray-800 text-white"
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-gray-800 text-white"
//         />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-gray-800 text-white"
//         />

//         <button
//           onClick={sendOtp}
//           className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded"
//         >
//           Send OTP
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { UserPlus, Mail, Lock, User as UserIcon, Sparkles, Send } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields!");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);
    try {
      await api.post("/otp/send", { email: form.email });
      
      toast.success("📧 OTP sent to your email!", {
        position: "top-center",
        autoClose: 2000,
      });
      
      localStorage.setItem("signupData", JSON.stringify(form));
      
      setTimeout(() => {
        window.location.href = "/verify";
      }, 1500);
    } catch (err) {
      toast.error("❌ Failed to send OTP. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-cyan-500/20 p-8 border-2 border-cyan-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-teal-500 to-cyan-500 p-4 rounded-2xl">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-600 mt-2 flex items-center justify-center space-x-2">
              <span>Join PizzaHub today</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative group">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500 group-focus-within:text-cyan-600 transition-colors" />
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-cyan-200 focus:border-cyan-400 focus:outline-none text-gray-800 placeholder-gray-500 transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500 group-focus-within:text-cyan-600 transition-colors" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-cyan-200 focus:border-cyan-400 focus:outline-none text-gray-800 placeholder-gray-500 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500 group-focus-within:text-cyan-600 transition-colors" />
              <input
                name="password"
                type="password"
                placeholder="Password (min 6 characters)"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-cyan-200 focus:border-cyan-400 focus:outline-none text-gray-800 placeholder-gray-500 transition-all"
              />
            </div>

            {/* Send OTP Button */}
            <button
              onClick={sendOtp}
              disabled={loading}
              className="group relative w-full py-4 rounded-xl overflow-hidden hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 blur-lg opacity-50"></div>
              <span className="relative text-white font-bold text-lg flex items-center justify-center space-x-2">
                <Send className="w-5 h-5" />
                <span>{loading ? "Sending OTP..." : "Send OTP"}</span>
              </span>
            </button>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-cyan-600 hover:text-cyan-700 font-bold hover:underline transition-colors"
                >
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

