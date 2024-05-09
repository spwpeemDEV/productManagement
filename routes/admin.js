const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../models/userModel");
require("dotenv").config();

// Userlist
router.get("/userlist", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send({ status: 200, message: "success", data: users });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

// Approve
router.put("/approve/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
        success: false,
        error: ["id is not a ObjectId"],
      });
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.approve) {
      return res
        .status(400)
        .send({ message: "User has already been approved" });
    }

    user.approve = true;
    const updatedUser = await user.save();

    res.send({ status: 200, message: "success", data: updatedUser });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

module.exports = router;
