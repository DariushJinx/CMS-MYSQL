const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/product.routes");
const commentRoutes = require("./routes/comment.routes");
const offRoutes = require("./routes/off.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/orders.routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/offs", offRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.listen(3000);
