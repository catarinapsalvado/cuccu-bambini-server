const router = require("express").Router();
const mongoose = require("mongoose");
const Cart = require("../models/Cart.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//Show the information of the cart
router.get("/cart", isAuthenticated, (req, res, next) => {
  const { _id, cart } = req.payload;
  const { product, owner } = req.body;
  Cart.findById(cart)
    .populate("product")
    .then((cart) => {
      res.status(200).json(cart);
    })
    .catch((err) => res.status(400).json({ err }));
});

router.put("/cart/:productId", isAuthenticated, (req, res, next) => {
  const { cart } = req.payload;
  const { productId } = req.params;

  Cart.findByIdAndUpdate(cart, { $push: { product: productId } }, { new: true })
    .then((updatedCart) => {
      return res.status(200).json(updatedCart);
    })
    .catch((err) =>
      res.status(400).json({ message: "No Products were added to the cart" })
    );
});

//delete
router.put("/cart/remove/:productId", (req, res, next) => {
  const { cart } = req.payload;
  const { productId } = req.params;
  console.log(cart, productId);

  Cart.findByIdAndUpdate(cart, { $pull: { product: productId } }, { new: true })
    .then((updatedCart) => {
      return res.status(200).json(updatedCart);
    })
    .catch((err) =>
      res.status(400).json({ message: "No Products were added to the cart" })
    );
});

module.exports = router;
