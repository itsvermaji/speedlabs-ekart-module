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
  valid_from: Joi.date().format("YYYY/MM/DD").greater("now").required(),
  valid_till: Joi.date()
    .format("YYYY/MM/DD")
    .greater(Joi.ref("valid_from"))
    .required(),
  terms_and_conditions: Joi.string(),
});

module.exports.joiSchema = schema;
