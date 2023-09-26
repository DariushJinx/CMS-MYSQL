const connection = require("../DB/shopDB");
const productRoutes = require("express").Router();

productRoutes.post("/add", (req, res, next) => {
  try {
    const body = req.body;
    const addUpdateQuery = `INSERT INTO Products VALUES (NULL,${body.title},${body.price},${body.count},${body.img},${body.popularity},${body.sales},${body.colors})`;
    connection.query(addUpdateQuery, (err, results) => {
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

productRoutes.get("/list", (req, res, next) => {
  try {
    let selectAllProductQuery = `SELECT * FROM Products`;
    connection.query(selectAllProductQuery, (err, results) => {
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

productRoutes.delete("/:productID", (req, res, next) => {
  try {
    let productID = req.params.productID;
    let deleteProductQuery = `DELETE FROM Products WHERE id ="${productID}"`;
    connection.query(deleteProductQuery, (err, results) => {
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

productRoutes.put("/:productID", (req, res, next) => {
  try {
    const body = req.body;
    const productID = req.params.productID;
    let updateProductQuery = `UPDATE Products SET title=${body.title},price=${body.price},count=${body.count},img=${body.img},popularity=${body.popularity},sale=${body.sale},colors= ${body.colors} WHERE id=${productID}`;
    connection.query(updateProductQuery, (err, results) => {
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

module.exports = productRoutes;
