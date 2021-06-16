exports.orders = (req, res) => {
  try {
    console.log("Here all the orders!");
  } catch (err) {
    return res.json({ msg: "An error occured, while fetching data" });
  }
};
exports.orderDetails = (req, res) => {
  try {
    res.json({ msg: "This is Order Details section." });
  } catch (err) {
    return res.json({ msg: "An error occured, while fetching data" });
  }
};
