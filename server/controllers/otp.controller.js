const Otp = require("../models/otp.model");
const generateOtp = require("../utils/generateOtp");
const { sendOtpMail } = require("../utils/sendMail");
const User = require("../models/user.model");
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
 const userExists = await User.findOne({ email });

//  console.log("Brevo API Key:",process.env.BREVO_API_KEY); 

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

    //  sendOtpMail(email, otp);

    await sendOtpMail(email, otp).catch(err =>
      console.error("OTP MAIL FAILED (NON-BLOCKING):", err.message)
    );
    console.log("OTP sent to email:", email ,"...otp:-",otp);

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// const Otp = require("../models/otp.model");
// const generateOtp = require("../utils/generateOtp");
// const { sendOtpMail } = require("../utils/sendMail");
// const User = require("../models/user.model");

// exports.sendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.json({ message: "User already exists. Please login." });
//     }

//     const otp = generateOtp();
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

//     // Remove old OTPs
//     await Otp.deleteMany({ email });

//     // Save OTP
//     await Otp.create({ email, otp, expiresAt });

//     // 🚀 Send mail WITHOUT blocking API
//     sendOtpMail(email, otp).catch(err =>
//       console.error("OTP MAIL FAILED (NON-BLOCKING):", err.message)
//     );

//     console.log("OTP GENERATED:", email, otp);

//     // ✅ Never lie about mail delivery
//     return res.json({ message: "OTP generated. Please check your email." });

//   } catch (error) {
//     console.error("SEND OTP ERROR:", error.message);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

