// const { start, today, end } = require("./dates");

const isApplicable = (coupon) => {
  const { coupon_quantity, label, valid_from, valid_till } = coupon;
  let success = true;
  let errors = [];
  // console.log(start(valid_from), today(), end(valid_till));

  if (coupon_quantity < 1 && errors.length < 1) {
    errors.push("Invalid Coupon!");
  }

  if (label !== "active" && errors.length < 1) {
    errors.push("Coupon is not active yet!");
  }
  if (valid_from > Date.now() && errors.length < 1) {
    errors.push("Coupon is scheduled for later use!");
  }

  if (Date.now() > valid_till && errors.length < 1) {
    errors.push("Coupon has expired!");
  }

  if (errors.length > 0) {
    success = false;
  } else {
    success = true;
  }

  return {
    errors: errors,
    success: success,
  };
};

// Discount Price
const discountPrice = (initial_price, discount_percent) => {
  return initial_price - Math.floor((discount_percent * initial_price) / 100);
};

module.exports.discountPrice = discountPrice;
module.exports.isApplicable = isApplicable;
