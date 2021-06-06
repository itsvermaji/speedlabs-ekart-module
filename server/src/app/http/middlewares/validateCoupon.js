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

    if (isValid) {
      db.query(
        "SELECT * FROM products WHERE id = ? AND issued_by = ?",
        [data.on_course_id, req.user.id],
        (err, results) => {
          if (err) {
            console.log(err);
            return res
              .status(400)
              .json({ msg: "An internal server error occured!" });
          }

          if (results == 0) {
            return res
              .status(400)
              .json({ msg: "You can't create coupon for this proeuct!" });
          } else {
            console.log(data);
            next();
          }
        }
      );
    } else {
      console.log(error);
      return res
        .status(400)
        .json({ msg: "Error occured while validating the coupon!" });
    }
  };
};
