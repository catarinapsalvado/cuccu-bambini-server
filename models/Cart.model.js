const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const cartSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
