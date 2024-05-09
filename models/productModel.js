const mongoose = require("mongoose");
const products = new mongoose.Schema({
  productName: { type: String, unique: true },
  price: { type: Number },
  amount: { type: Number },
});

module.exports = mongoose.model("products", products);
