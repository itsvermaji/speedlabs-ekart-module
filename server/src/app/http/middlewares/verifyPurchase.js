const jwt = require("jsonwebtoken");
const db = require("../../config/dbConnection");

exports.verifyPurchase = (req, res, next) => {
  var product = req.params.id,
    sql = "",
    user = req.user.id,
    content = req.params.content;
  try {
    // Verify that user has purchased this product!
    // Then verify that whether the content belongs to the user.
    sql = "SELECT * FROM orders WHERE user_id = ? AND product_id = ?";
    db.query(sql, [user, product], (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "Internal Server error occured!" });
      }

      if (rows.length < 1) {
        return res.status(200).json({
          flag: 2,
          msg: "You can't rate this product yet!",
        });
      }

      sql = "SELECT * FROM resources WHERE product_id = ? AND id = ?";
      db.query(sql, [product, content], (err, rows) => {
        if (err) {
          console.log(err);
          return res
            .status(200)
            .json({ flag: 2, msg: "Internal Server error occured!" });
        }

        if (rows.length < 1) {
          return res.status(200).json({
            flag: 2,
            msg: "You can't rate on this content, Bad request!",
          });
        }

        next();
      });
    });
  } catch (err) {
    console.log(err);
    return res.json({ msg: "You have to first purchase this order!" });
  }
};
