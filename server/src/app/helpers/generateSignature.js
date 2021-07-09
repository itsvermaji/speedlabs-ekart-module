const { createHmac } = require("crypto");

function generateSignature(order_id, razorpay_payment_id) {
  const hmac = createHmac("sha256", process.env.KEY_SECRET);

  hmac.update(order_id + "|" + razorpay_payment_id);
  let generatedSignature = hmac.digest("hex");
  return generatedSignature;
}

module.exports.generateSignature = generateSignature;
