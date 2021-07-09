const db = require("../../config/dbConnection");

module.exports.orders = (req, res) => {
  var user_id = 0,
    sql = "";

  user_id = req.user.id;
  if (req.user.role === "admin") {
    sql =
      "SELECT products.product_name, image_url, orders.* FROM orders RIGHT JOIN products ON orders.product_id = products.id WHERE published_by = ? AND order_id IS NOT NULL";
  } else {
    sql =
      "SELECT products.product_name, image_url, orders.* FROM orders RIGHT JOIN products ON orders.product_id = products.id WHERE user_id = ? AND order_id IS NOT NULL";
  }

  try {
    db.query(sql, user_id, (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "An error occured while deleting!" });
      }

      return res.status(200).json({ flag: 1, msg: "Success", orders: rows });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

module.exports.orderDetails = (req, res) => {
  var sql = "",
    order_id = req.params.id,
    user_id = req.user.id;
  if (req.user.role === "admin") {
    sql =
      "SELECT * FROM orders WHERE published_by = ? AND id = ? AND order_id IS NOT NULL";
  } else {
    sql =
      "SELECT * FROM orders WHERE user_id = ? AND id = ? AND order_id IS NOT NULL";
  }

  try {
    db.query(sql, [user_id, order_id], (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "An error occured while deleting!" });
      }

      if (rows.length < 1) {
        return res
          .status(200)
          .json({ flag: 1, msg: "Sorry, you don't have any orders" });
      }

      return res.status(200).json({ flag: 1, msg: "Success", orders: rows });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};
