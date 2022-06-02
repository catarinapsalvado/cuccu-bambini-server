const router = require("express").Router();
const mongoose = require("mongoose");
const Cart = require("../models/Cart.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const fileUploader = require("../config/cloudinary.config");

router.get("/cart", (req, res, next) => {
  const { _id } = req.payload;
  const { product, owner } = req.body;
  User.findById(_id)
    .populate("cart")
    .then((user) => {
      res.status(200).json(user.cart);
    })
    .catch((err) => res.status(400).json({ err }));
});

module.exports = router;
