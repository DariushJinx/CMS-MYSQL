const connection = require("../db/shopDB");

const basketRoutes = require("express").Router();

basketRoutes.post("/:userID", (req, res, next) => {
  try {
    const userID = req.params.userID;
    const body = req.body;
    const insertToBasketQuery = `INSERT INTO baskets VALUES (NULL,${body.productID},${userID},"${body.productImg}","${body.productTitle}",${body.productPrice},'${body.productUrl}',${body.count})`;
    connection.query(insertToBasketQuery, (err, result) => {
      if (err) {
        res.send(null);
      } else {
        res.send(result);
      }
    });
  } catch (err) {
    next(err);
  }
});

basketRoutes.put("/:userID/:productID", (req, res, next) => {
  try {
    const userID = req.params.userID;
    const productID = req.params.productID;
    let increaseProductCountQuery = `UPDATE Baskets SET count = count + 1 WHERE userID = ${userID} AND productID = ${productID}`;
    connection.query(increaseProductCountQuery, (err, result) => {
      if (err) {
        res.send(null);
      } else {
        res.send(result);
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = basketRoutes;
