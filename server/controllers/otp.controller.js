const Otp = require("../models/otp.model");
const generateOtp = require("../utils/generateOtp");
const { sendOtpMail } = require("../utils/sendMail");
const User = require("../models/user.model");

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ message: "User already exists. Please login." });
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Remove old OTPs
    await Otp.deleteMany({ email });

    // Save OTP
    await Otp.create({ email, otp, expiresAt });

    // 🚀 Send mail WITHOUT blocking API
    sendOtpMail(email, otp).catch(err =>
      console.error("OTP MAIL FAILED (NON-BLOCKING):", err.message)
    );

    console.log("OTP GENERATED:", email, otp);

    // ✅ Never lie about mail delivery
    return res.json({ message: "OTP generated. Please check your email." });

  } catch (error) {
    console.error("SEND OTP ERROR:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// exports.verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     // OTP is valid → frontend can now allow register
//     await Otp.deleteMany({ email });

//     res.json({ message: "OTP verified successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "OTP verification failed" });
//   }
// };
