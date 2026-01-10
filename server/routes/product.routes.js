const express = require("express");
const router = express.Router();

const { getMenu, addProduct ,updateProduct,getall} = require("../controllers/product.controller");
// const { authenticate } = require("../middlewares/auth.middleware");
// const { isAdmin } = require("../middlewares/admin.middleware");
const { auth, isUser, isAdmin } = require("../middlewares/auth")
router.get("/menu", getMenu);

router.post(
  "/add",
  auth,
  isAdmin,
  addProduct
);
router.get("/all",auth,isAdmin,getall);

router.patch("/:id", updateProduct);


module.exports = router;
