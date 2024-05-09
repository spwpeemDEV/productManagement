const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post("/register", async (req, res) => {
  try {
    let { email, password, role } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    let newUser = new userModel({ email, password: hashPassword, role });
    let user = await newUser.save();
    res.send({ status: 200, message: "success", data: user });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (!user.approve) {
      return res
        .status(403)
        .send({ message: "Your account has not been approved yet" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ status: 200, message: "success", token });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

module.exports = router;
