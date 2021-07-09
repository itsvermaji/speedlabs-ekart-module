const Joi = require("joi");
const db = require("../../config/dbConnection");

module.exports.validateCoupon = (joiSchema) => {
  return (req, res, next) => {
    const data = {
      coupon_quantity: req.body.coupon_quantity,
      coupon_code: req.body.coupon_code,
      on_course_id: req.body.on_course_id,
      description: req.body.description,
      label: req.body.label,
      discount_percent: req.body.discount_percent,
      valid_from: req.body.valid_from,
      valid_till: req.body.valid_till,
      terms_and_conditions: req.body.terms_and_conditions,
    };

    // console.log("middleware is getting kicked in");
    const { error } = joiSchema.validate(data);
    const isValid = error == null;

    // Validating dates

    if (isValid) {
      db.query(
        "SELECT * FROM products WHERE id = ? AND issued_by = ?",
        [data.on_course_id, req.user.id],
        (err, results) => {
          if (err) {
            console.log(err);
            return res
              .status(200)
              .json({ flag: 2, msg: "An internal server error occured!" });
          }

          if (results == 0) {
            return res.status(200).json({
              flag: 2,
              msg: "You can't create coupon for this product!",
            });
          }
          next();

          // db.query(
          //   "SELECT coupon_code FROM coupons WHERE coupon_code = ? AND institute_id = ?",
          //   [data.coupon_code, req.user.id],
          //   (err, rows) => {
          //     if (err) {
          //       console.log(err);
          //       return res
          //         .status(200)
          //         .json({ flag: 2, msg: "An internal server error occured!" });
          //     }

          //     if (rows.length > 0) {
          //       return res.status(200).json({
          //         flag: 2,
          //         msg: "A coupon by this name already exists, please try different name!",
          //       });
          //     }

          //     console.log(data);
          //   }
          // );
        }
      );
    } else {
      console.log(error);
      return res.status(200).json({
        flag: 2,
        msg: "Error occured while validating the coupon!",
        error,
      });
    }
  };
};
