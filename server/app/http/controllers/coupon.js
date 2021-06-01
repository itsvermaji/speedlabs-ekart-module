const db = require("../../config/dbConnection");

exports.allCoupons = (req, res) => {
  console.log("This shows all the coupons!");

  //   console.log(req.user);
  //   console.log(req.user.id);

  //   db.query(
  //     "SELECT * FROM products WHERE issued_by = ?",
  //     req.user.id,
  //     (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         return res.json({ msg: "Bad Request!" });
  //       }

  //       return res.json(results);
  //     }
  //   );
};

exports.createCoupon = (req, res) => {
  // const { image_name, image_url } = req.body;
  console.log("Coupon validated Successfully!");

  const couponObj = {
    coupon_code: req.body.coupon_code,
    user_id: req.body.user_id,
    institute_id: req.user.id,
    description: req.body.description,
    discount_percent: req.body.discount_percent,
    discount_amount: req.body.discount_amount,
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
