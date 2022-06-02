const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  image: {
    type: String,
    /* required: true, */
  },

  category: {
    type: String,
    required: true,
    enum: ["Clothing", "Footwear", "Baby-gear"],
  },

  available: {
    type: Boolean,
    default: true,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
