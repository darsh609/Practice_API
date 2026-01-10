// import { useState } from "react";
// import api from "../services/api";

// const VerifyOtp = () => {
//   const [otp, setOtp] = useState("");

//   const verifyOtp = async () => {
//     try {
//       const data = JSON.parse(localStorage.getItem("signupData"));

//       await api.post("/auth/register", {
//         ...data,
//         otp
//       });

//       alert("Account created successfully");
//       localStorage.removeItem("signupData");
//       window.location.href = "/login";
//     } catch (err) {
//       alert("OTP verification failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//       <div className="bg-gray-900 p-8 rounded-xl w-96 space-y-4">
//         <h2 className="text-xl text-white text-center">
//           Verify OTP
//         </h2>

//         <input
//           placeholder="Enter OTP"
//           onChange={(e) => setOtp(e.target.value)}
//           className="w-full p-2 rounded bg-gray-800 text-white"
//         />

//         <button
//           onClick={verifyOtp}
//           className="w-full bg-green-600 hover:bg-green-500 p-2 rounded"
//         >
//           Verify & Signup
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;
import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { ShieldCheck, Sparkles, CheckCircle } from "lucide-react";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP!");
      return;
    }

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits!");
      return;
    }

    setLoading(true);
    try {
      const data = JSON.parse(localStorage.getItem("signupData"));

      await api.post("/auth/register", {
        ...data,
        otp
      });

      toast.success("🎉 Account created successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      localStorage.removeItem("signupData");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      toast.error("❌ OTP verification failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") verifyOtp();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-cyan-500/20 p-8 border-2 border-cyan-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-2xl">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Verify OTP
            </h2>
            <p className="text-gray-600 mt-2 flex items-center justify-center space-x-2">
              <span>Enter the code sent to your email</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </p>
          </div>

          {/* OTP Input */}
          <div className="space-y-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                onKeyPress={handleKeyPress}
                maxLength={6}
                className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-cyan-200 focus:border-cyan-400 focus:outline-none text-gray-800 text-center text-2xl font-bold tracking-widest placeholder-gray-500 transition-all"
              />
            </div>

            {/* Verify Button */}
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="group relative w-full py-4 rounded-xl overflow-hidden hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-lg opacity-50"></div>
              <span className="relative text-white font-bold text-lg flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>{loading ? "Verifying..." : "Verify & Signup"}</span>
              </span>
            </button>

            {/* Resend OTP */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Didn't receive code?{" "}
                <button
                  onClick={() => toast.info("Resend feature coming soon!")}
                  className="text-cyan-600 hover:text-cyan-700 font-bold hover:underline transition-colors"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
