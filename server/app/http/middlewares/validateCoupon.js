const Joi = require("joi");
const db = require("../../config/dbConnection");

module.exports.validateCoupon = (joiSchema) => {
  return (req, res, next) => {
    const data = {
      coupon_code: req.body.coupon_code,
      user_id: req.body.user_id,
      description: req.body.description,
      discount_percent: req.body.discount_percent,
      discount_amount: req.body.discount_amount,
      valid_from: req.body.valid_from,
      valid_till: req.body.valid_till,
      terms_and_conditions: req.body.terms_and_conditions,
    };

    // console.log("middleware is getting kicked in");
    const { error } = joiSchema.validate(data);
    const isValid = error == null;

    if (isValid) {
      db.query(
        "SELECT * FROM user_details WHERE user_id = ? AND user_inst_id = ?",
        [data.user_id, req.user.id],
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
              .json({ msg: "You can't create coupon for this user!" });
          } else {
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
