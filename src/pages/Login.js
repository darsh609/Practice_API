// import { useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//     const navigate=useNavigate();   
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async () => {
    
//     try {
//     const res = await api.post(
//   "/auth/login",
//   { email, password }

// );

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
// navigate("/");
//       alert("Login successful");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//       <div className="bg-gray-900 p-8 rounded-xl w-96 space-y-4">
//         <h2 className="text-2xl text-white text-center">
//           Login
//         </h2>

//         <input
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 rounded bg-gray-800 text-white"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 rounded bg-gray-800 text-white"
//         />

//         <button
//           onClick={login}
//           className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogIn, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      toast.success("🎉 Login successful! Welcome back!", {
        position: "top-center",
        autoClose: 2000,
      });
      
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error("❌ Invalid credentials. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") login();
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
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-2 flex items-center justify-center space-x-2">
              <span>Login to continue</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </p>
          </div>

          {/* Email Input */}
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500 group-focus-within:text-cyan-600 transition-colors" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-cyan-200 focus:border-cyan-400 focus:outline-none text-gray-800 placeholder-gray-500 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500 group-focus-within:text-cyan-600 transition-colors" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-cyan-200 focus:border-cyan-400 focus:outline-none text-gray-800 placeholder-gray-500 transition-all"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={login}
              disabled={loading}
              className="group relative w-full py-4 rounded-xl overflow-hidden hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 blur-lg opacity-50"></div>
              <span className="relative text-white font-bold text-lg flex items-center justify-center space-x-2">
                <span>{loading ? "Logging in..." : "Login"}</span>
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>

            {/* Signup Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-cyan-600 hover:text-cyan-700 font-bold hover:underline transition-colors"
                >
                  Signup here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;