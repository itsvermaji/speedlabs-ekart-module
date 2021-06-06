const db = require("../../config/dbConnection");

exports.allCoupons = async (req, res) => {
  db.query(
    "SELECT * FROM coupons WHERE institute_id = ?",
    req.user.id,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: "An error occured!" });
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
