const router = require("express").Router();
const mongoose = require("mongoose");
const Cart = require("../models/Cart.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//Show the information of the cart
router.get("/cart", isAuthenticated, (req, res, next) => {
  const { _id } = req.payload;
  const { product, owner } = req.body;
  User.findById(_id)
    .populate("cart")
    .then((user) => {
      res.status(200).json(user.cart);
    })
    .catch((err) => res.status(400).json({ err }));
});

/* // Create one cart just to test
router.post("/create-cart", (req, res, next) => {
  console.log(req.body);
  const { name, price, image, size, brand } = req.body;

  Cart.create({
    product,
    owner,
  })
    .then((newCart) => {
      return res.status(200).json(newCart);
    })
    .catch((err) =>
      res.status(400).json({ message: "No Products were created" })
    );
});
 */

//  Insert new  information to the DB

router.post("/cart/:productId", (req, res, next) => {
  const { _id, name, price, image, size, brand } = req.payload;
  const { product, owner } = req.params;
  User.findByIdAndUpdate(_id, { $push: { cart: { _id } } }, { new: true })
    .then((addedProduct) => {
      return res.status(200).json(addedProduct);
    })
    .catch((err) =>
      res.status(400).json({ message: "No Products were added to the cart" })
    );
});

//delete
router.delete("/cart/:productId", (req, res, next) => {
  const { _id } = req.payload;
  const { productId } = req.params;
  //console.log(req.params);

  User.findByIdAndRemove(productId)

    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(400).json({ message: "Error message" }));
});

router.get("/cart/checkout", (req, res, next) => {
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
