const JoiBase = require("joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

const schema = Joi.object({
  coupon_code: Joi.string().required(),
  user_id: Joi.number().required(),
  description: Joi.string().required(),
  discount_percent: Joi.number(),
  discount_amount: Joi.number(),
  valid_from: Joi.date().format("YYYY/MM/DD").greater("now").required(),
  valid_till: Joi.date()
    .format("YYYY/MM/DD")
    .greater(Joi.ref("valid_from"))
    .required(),
  terms_and_conditions: Joi.string(),
});

module.exports.joiSchema = schema;
