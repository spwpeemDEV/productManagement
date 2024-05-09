const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode.role === "admin") {
      return next();
    } else {
      return res.json({
        message: "Admin role Only",
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: "401",
      message: "No token",
    });
  }
};
