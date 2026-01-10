const Otp = require("../models/otp.model");
const generateOtp = require("../utils/generateOtp");
const sendMail = require("../utils/sendMail");
const User = require("../models/user.model");
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
 const userExists = await User.findOne({ email });

 if(userExists){
    res.json({ message: "User already exists. Please login." });
    return;
 }
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
      expiresAt
    });

    await sendMail(email, otp);
    console.log("OTP sent to email:", email ,"...otp:-",otp);

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
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
