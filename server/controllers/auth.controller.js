const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    // OTP check
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Prevent duplicate users
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔒 ROLE DECIDED BY BACKEND
    const ADMIN_EMAILS = process.env.ADMIN_EMAILS.split(",");
    const role = ADMIN_EMAILS.includes(email) ? "ADMIN" : "USER";

    await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    await Otp.deleteMany({ email });

    res.status(201).json({
      message: "Registration successful",
      role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id ,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});

    res.json({
       success: true,
				token,
				user,
				message: `User Login Success`,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

