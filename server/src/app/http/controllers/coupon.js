const { beginTransaction } = require("../../config/dbConnection");
const db = require("../../config/dbConnection");
const { isApplicable, discountPrice } = require("../../helpers/coupon");

// All Coupons
exports.allCoupons = (req, res) => {
  db.query(
    "SELECT * FROM coupons WHERE institute_id = ?",
    req.user.id,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: "An error occured!" });
      }

      if (rows.length < 1) {
        return res.status(400).json({
          msg: "There are no coupons currently, start by click create button!",
        });
      }

      return res.status(200).json(rows);
    }
  );
};

// Create Coupon
exports.createCoupon = (req, res) => {
  // const { image_name, image_url } = req.body;
  console.log("Coupon validated Successfully!");

  const couponObj = {
    coupon_quantity: req.body.coupon_quantity,
    coupon_code: req.body.coupon_code,
    on_course_id: req.body.on_course_id,
    institute_id: req.user.id,
    label: req.body.label,
    description: req.body.description,
    discount_percent: req.body.discount_percent,
    valid_from: req.body.valid_from,
    valid_till: req.body.valid_till,
    terms_and_conditions: req.body.terms_and_conditions,
  };

  db.query("INSERT INTO coupons SET ?", couponObj, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        msg: "Internal Server error, error while creating the product!",
      });
    }

    db.query(
      "SELECT * FROM coupons WHERE id = ?",
      results.insertId,
      (err, results) => {
        console.log(results);
      }
    );

    return res.status(200).json({ msg: "Coupon created Successfully!" });
  });
};

// Read Coupon
exports.couponDetails = (req, res) => {
  const coupon_id = req.params.id;

  db.query(
    "SELECT * FROM coupons WHERE institute_id = ? AND id = ?",
    [req.user.id, coupon_id],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: "Internal Server error, error while getting coupons!",
        });
      }

      if (rows.length == 0) {
        return res.status(400).json({ msg: "Sorry, No such coupon is there!" });
      }

      console.log(rows);
      return res.status(200).json({ coupons: rows });
    }
  );
};

// Update Coupon
exports.updateCoupon = (req, res) => {
  const coupon_id = req.params.id;

  const couponObj = {
    coupon_quantity: req.body.coupon_quantity,
    coupon_code: req.body.coupon_code,
    institute_id: req.user.id,
    on_course_id: req.body.on_course_id,
    description: req.body.description,
    label: req.body.label,
    discount_percent: req.body.discount_percent,
    valid_from: req.body.valid_from,
    valid_till: req.body.valid_till,
    terms_and_conditions: req.body.terms_and_conditions,
  };

  console.log(coupon_id);
  db.query(
    "SELECT * FROM coupons WHERE institute_id = ? AND id = ?",
    [req.user.id, coupon_id],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg: "Internal Server error, error while creating the product!",
        });
      }

      if (rows.length == 0) {
        console.log("coupons: ", rows);
        return res.status(400).json({ msg: "Bad request!" });
      }

      db.query(
        "UPDATE coupons SET ? WHERE id = ?",
        [couponObj, coupon_id],
        (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              msg: "Internal Server error, error while creating the product!",
            });
          }

          db.query(
            "SELECT * FROM coupons WHERE id = ?",
            results.insertId,
            (err, results) => {
              console.log(results);
              return res
                .status(200)
                .json({ msg: "Coupon Updated Successfully!" });
            }
          );
        }
      );
    }
  );
};

// Delete coupon
exports.deleteCoupon = (req, res) => {
  const coupon_id = req.params.id;

  // return res.status(200).json({ msg: `Coupon: deleted successfully!` });

  let sql = `DELETE FROM coupons WHERE id = ${coupon_id} AND institute_id = ${req.user.id}`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        msg: "Internal Server error, error while getting coupons!",
      });
    }

    console.log(results);

    return res
      .status(200)
      .json({ msg: `coupon_id: ${coupon_id} deleted successfully!` });
  });
};

// Apply Coupon

exports.applyCoupon = (req, res) => {
  const coupon_code = req.query.apply;
  // First check if the product is in the cart!
  const product_id = req.params.id;
  var price_before_coupon = 0,
    price_after_coupon = 0,
    discount_percent = 0,
    coupon_id = 0,
    cart_id = 0,
    total_amt = 0,
    coupon_quantity = 0;

  var sql = `SELECT * FROM user_carts RIGHT JOIN cart_contents ON user_carts.id = cart_contents.cart_id WHERE user_carts.user_id = ${req.user.id} and cart_contents.product_id = ${product_id}`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ msg: "An error occured!" });
    }

    if (rows.length < 1) {
      return res.status(400).json({
        msg: "Please add the product in your cart before applying coupon on this product!",
      });
    }

    // Getting cart total
    total_amt = rows[0].total_amt;

    // If Another coupon already applied
    if (rows[0].coupon_code) {
      return res.status(400).json({
        msg: "Another coupon already applied!, you cannot apply this coupon.",
      });
    }

    price_before_coupon = rows[0].net_price;
    cart_id = rows[0].cart_id;

    sql = "SELECT * FROM coupons WHERE on_course_id = ? AND coupon_code = ?";
    db.query(sql, [product_id, coupon_code], (err, rows) => {
      if (err) {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .json({ msg: "Internal Server error occured! please try again" });
        }
      }

      if (rows.length < 1) {
        return res.status(400).json({ msg: "Invalid coupon code!" });
      }

      discount_percent = rows[0].discount_percent;
      coupon_id = rows[0].id;
      coupon_quantity = rows[0].coupon_quantity;

      // console.log(price_before_coupon, discount_percent);

      total_amt = total_amt - price_before_coupon;
      price_after_coupon = discountPrice(price_before_coupon, discount_percent);
      total_amt = total_amt + price_after_coupon;

      // console.log(price_after_coupon, cart_id);

      const coupon = rows[0];
      const { errors, success } = isApplicable(coupon);

      if (!success) {
        return res.status(400).json({ success, errors });
      }

      // Update the cart_contents net_price
      sql = "UPDATE cart_contents SET ? WHERE cart_id = ? AND product_id = ?";
      let cartObj = { coupon_code, net_price: price_after_coupon };
      db.query(sql, [cartObj, cart_id, product_id], (err, rows) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .json({ msg: "Internal Server error occured! please try again" });
        }

        if (rows.affectedRows < 1) {
          return res
            .status(400)
            .json({ msg: "Coupon not applied, please try again!" });
        }
        // Change the coupon quantity;
        // Change the cart price;

        // Updating the cart total!
        sql = "UPDATE user_carts SET ? WHERE user_id = ?";
        cartObj = { total_amt };
        db.query(sql, [cartObj, req.user.id], (err, rows) => {
          if (err) {
            console.log(err);
            return res.status(400).json({
              msg: "Internal Server error occured! please try again",
            });
          }

          if (rows.affectedRows < 1) {
            return res
              .status(400)
              .json({ msg: "Failed to update coupon quantity!" });
          }

          sql = "UPDATE coupons SET ? WHERE id = ?";
          couponObj = { coupon_quantity: coupon_quantity - 1 };
          db.query(sql, [couponObj, coupon_id], (err, rows) => {
            if (err) {
              console.log(err);
              return res.status(400).json({
                msg: "Internal Server error occured! please try again",
              });
            }

            if (rows.affectedRows < 1) {
              return res
                .status(400)
                .json({ msg: "Failed to update coupon quantity!" });
            }

            return res
              .status(200)
              .json({ msg: "Coupon Successfully applied!" });
          });
        });
      });
    });
  });
};

exports.removeCoupon = (req, res) => {
  var on_course_id = req.params.id;
  var msg = "",
    sql = "",
    coupon_code = "",
    coupon_quantity = 0,
    total_amt = 0,
    price_before_coupon = 0;

  sql =
    "SELECT * FROM user_carts RIGHT JOIN cart_contents ON user_carts.id = cart_contents.cart_id WHERE user_carts.user_id = ? AND product_id = ?";

  db.query(sql, [req.user.id, on_course_id], (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        msg: "Internal Server error occured! please try again",
      });
    }

    if (rows.length < 1) {
      msg =
        "The product for which you are trying to remove coupon is not present in your cart!";
      return res.status(400).json({ msg });
    }

    if (rows[0].coupon_code == null) {
      msg = "Invalid request!";
      return res.status(400).json({ msg });
    }

    // Coupon quantity will increase
    // cart_contents product price will be restored
    // total_amt price will be restored.

    coupon_code = rows[0].coupon_code;
    total_amt = rows[0].total_amt - rows[0].net_price;

    sql =
      "SELECT * FROM coupons RIGHT JOIN products ON coupons.on_course_id = products.id WHERE on_course_id = ? AND coupon_code = ?";
    db.query(sql, [on_course_id, coupon_code], (err, rows) => {
      if (err) {
        console.log(err);
        msg = "Internal Server error occured! please try again";
        return res.status(400).json({ msg });
      }

      if (rows.length < 1) {
        msg = "There is no such coupon!";
        return res.status(400).json({ msg });
      }

      coupon_quantity = rows[0].coupon_quantity;
      price_before_coupon = discountPrice(rows[0].price, rows[0].discount);
      total_amt = total_amt + price_before_coupon;
      console.log(price_before_coupon);

      console.log(coupon_quantity);

      // First coupon quantity is restored.
      sql = "UPDATE coupons SET ? WHERE on_course_id = ? AND coupon_code = ?";
      couponObj = { coupon_quantity: coupon_quantity + 1 };
      db.query(sql, [couponObj, on_course_id, coupon_code], (err, results) => {
        if (err) {
          console.log(err);
          msg = "Internal Server error occured! please try again";
          return res.status(400).json({ msg });
        }

        if (rows[0].affectedRows < 1) {
          console.log("Coupon failed to remove!");
        }

        console.log(results);
        console.log("coupon quantity restored!");

        sql = `UPDATE user_carts INNER JOIN cart_contents ON user_carts.id = cart_contents.cart_id SET total_amt = ${total_amt}, net_price = ${price_before_coupon}, coupon_code = ${null} WHERE cart_contents.product_id = ?`;
        db.query(sql, on_course_id, (err, results) => {
          if (err) {
            console.log(err);
            msg = "Internal Server error occured! please try again";
            return res.status(400).json({ msg });
          }

          if (rows[0].affectedRows < 1) {
            msg = "An error occured on updating prices while removing coupon!";
            console.log(msg);
          }

          return res.status(200).json({ results });
        });
      });
    });
  });
};
