const connection = require("../DB/shopDB");

const offRoutes = require("express").Router();

offRoutes.post("/add", (req, res, next) => {
  try {
    const body = req.body;
    const addUpdateQuery = `INSERT INTO Offs VALUES (NULL,${body.code},${body.percent},${body.adminID},${body.productID},${body.date},${body.isActive})`;
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

offRoutes.get("/list", (req, res, next) => {
  try {
    let getAll = `SELECT * FROM Offs`;
    connection.query(getAll, (err, results) => {
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

offRoutes.delete("/:offID", (req, res, next) => {
  try {
    const offID = req.params.offID;
    let deleteQuery = `DELETE FROM Users WHERE id =${offID}`;
    connection.query(deleteQuery, (err, results) => {
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

offRoutes.put("/active-off/:offID/:isActive", (req, res, next) => {
  try {
    let offID = req.params.offID;
    let isActive = req.params.isActive;
    let updateQuery = `UPDATE Offs SET isActive=${isActive} WHERE id=${offID}`;
    connection.query(updateQuery, (err, results) => {
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

module.exports = offRoutes;
