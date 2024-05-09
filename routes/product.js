const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.send({ status: 200, message: "success", data: products });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"],
      });
    }
    const product = await productModel.findById(id);
    res.send({ status: 200, message: "success", data: product });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let { productName, price, amount } = req.body;

    let check = await productModel.findOne({ productName });
    if (check) {
      return res.status(400).json({
        message: "Product already exists",
      });
    }

    let newProduct = new productModel({ productName, price, amount });
    console.log(newProduct.productName);
    let product = await newProduct.save();
    res.status(201).json({ status: 201, message: "success", data: product });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"],
      });
    }
    await productModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: req.body }
    );
    let product = await productModel.findById(id);
    res.send({ status: 201, message: "success", data: product });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"],
      });
    }
    await productModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    let products = await productModel.find();
    res.send({ status: 201, message: "success", data: products });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

router.post("/:id/orders", async (req, res) => {
  try {
    let { orderAmount } = req.body;
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"],
      });
    }
    const token = req.headers.authorization?.split(" ")[1];
    const decode = jwt.decode(token);
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    let newOrder = new orderModel({
      email: decode.email,
      productName: product.productName,
      orderAmount,
    });
    let order = await newOrder.save();
    res.send({ status: 200, message: "success", data: order });
  } catch (e) {
    res.statusCode = 500;
    console.log(e);
    res.send({ message: e.message });
  }
});

router.get("/:id/orders", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"],
      });
    }
    let product = await productModel.findById(id);
    let order = await orderModel.find({
      productName: product.productName,
    });
    res.send({ status: 200, message: "success", data: order });
  } catch (e) {
    res.statusCode = 500;
    console.log(e);
    res.send({ message: e.message });
  }
});

module.exports = router;
