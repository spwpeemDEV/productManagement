const mongoose = require("mongoose");
const orders = new mongoose.Schema({
  email: { type: String },
  productName: { type: String },
  orderAmount: { type: Number },
});

module.exports = mongoose.model("orders", orders);
