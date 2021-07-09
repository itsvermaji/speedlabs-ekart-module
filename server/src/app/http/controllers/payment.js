const db = require("../../config/dbConnection");
const { nanoid } = require("nanoid");

const razorpay = require("../../config/payment");

module.exports.payment = (req, res) => {
  var payment_id = req.body.payment_id,
    order_id = 0,
    amount = 0,
    sql = "";

  try {
    sql = "SELECT total_amt FROM user_carts WHERE user_id = ?";
    db.query(sql, req.user.id, async (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "An error occured while deleting!" });
      }

      amount = rows[0].total_amt;
      console.log(amount);

      const payObj = {
        amount: amount * 100, // rzp format with paise
        currency: "INR",
        receipt: nanoid(), //Receipt no that corresponds to this Order,
        // payment_capture: req.body.payment_capture,
      };

      const response = await razorpay.orders.create(payObj);
      console.log(response);
      order_id = response.id;

      return res
        .status(200)
        .json({ flag: 1, msg: "Order id generated!", details: response });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};
