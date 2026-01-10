const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cookieParser());


const cors = require("cors");

app.use(cors({
  origin: "*", // or your frontend URL
  credentials: true
}));

connectDB();
const { checkApiKey } = require("./middlewares/apiKey.middlewares");

app.use(checkApiKey);

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/otp", require("./routes/otp.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/cart", require("./routes/cart.routes"));

app.listen(PORT, () => {
  console.log(`Server running on porttt ${PORT}`);
});
module.exports = app;