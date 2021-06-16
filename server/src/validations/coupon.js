const JoiBase = require("joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

const schema = Joi.object({
  coupon_quantity: Joi.number().required().min(1),
  coupon_code: Joi.string().required(),
  on_course_id: Joi.number().required(),
  description: Joi.string().required(),
  label: Joi.string().valid("active", "inactive").required(),
  discount_percent: Joi.number(),
  valid_from: Joi.date().format("YYYY/MM/DD").required(),
  valid_till: Joi.date()
    .format("YYYY/MM/DD")
    .min(Joi.ref("valid_from"))
    .required(),
  // valid_from: Joi.date().format("YYYY/MM/DD").min("now").required(),
  // valid_till: Joi.date()
  //   .format("YYYY/MM/DD")
  //   .min(Joi.ref("valid_from"))
  //   .required(),
  terms_and_conditions: Joi.string(),
});

module.exports.joiSchema = schema;
