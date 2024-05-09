const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const verifyToken = require("../middleware/verifyToken");
const orderModel = require("../models/orderModel");

router.get("/", async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.send({ status: 200, message: "success", data: orders });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
