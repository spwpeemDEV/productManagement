const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");
const adminRouter = require("./routes/admin");
const verifyToken = require("./middleware/verifyToken");
const verifyAdmin = require("./middleware/verifyAdmin");
require("./db");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/orders", verifyToken, orderRouter);
app.use("/api/v1/products", verifyToken, productRouter);
app.use("/api/v1/admin", verifyAdmin, adminRouter);

app.listen(port, () => {
  console.log(`App listening on port`, port);
});
