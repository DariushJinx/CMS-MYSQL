const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/product.routes");
const basketRoutes = require("./routes/basket.routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/product/", productRoutes);
app.use("/api/basket", basketRoutes);

app.listen(4000);