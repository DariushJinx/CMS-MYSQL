const connection = require("../db/shopDB");
const separatedProductsByCategory = require("../utils/utils");

const productRoutes = require("express").Router();

productRoutes.get("/:productUrl", (req, res, next) => {
  try {
    const productUrl = req.params.productUrl;
    const getMainProductQuery = `SELECT * FROM Products WHERE url="${productUrl}"`;
    connection.query(getMainProductQuery, (err, results) => {
      if (err) {
        res.send(null);
      } else {
        res.send(results);
      }
    });
  } catch (err) {
    next(err);
  }
});

productRoutes.get("/", (req, res, next) => {
  try {
    const getAllProductsQuery = `SELECT * FROM Products`;
    connection.query(getAllProductsQuery, (err, results) => {
      if (err) {
        res.send(null);
      } else {
        let allSeparateProducts = null;
        separatedProductsByCategory(results).then((allProducts) => {
          allSeparateProducts = allProducts;
          res.send(allSeparateProducts);
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = productRoutes;
