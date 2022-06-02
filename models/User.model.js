const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    default: "",
  },

  role: {
    type: String, //user, admin
    default: "user",
  },

  cart: {
    type: Array,
    default: [],
  },
});

const User = model("User", userSchema);

module.exports = User;