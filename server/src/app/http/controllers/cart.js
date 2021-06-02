const db = require("../../config/dbConnection");

exports.getCartItems = (req, res) => {
  try {
    console.log("This shows all the Cart Items!");
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ msg: "An error occured while getting your cart items!" });
  }
};

exports.addItemToCart = (req, res) => {
  // const { image_name, image_url } = req.body;
  console.log(req.user.id);

  try {
    const rows = db.query("INSERT INTO coupons SET ?", couponObj);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      msg: "An error occured while getting adding an item to the Cart!",
    });
  }

  //   db.query("INSERT INTO coupons SET ?", couponObj, (err, results) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({
  //         msg: "Internal Server error, error while creating the product!",
  //       });
  //     }

  //     db.query(
  //       "SELECT * FROM coupons WHERE id = ?",
  //       results.insertId,
  //       (err, results) => {
  //         console.log(results);
  //       }
  //     );

  //     return res.status(200).json({ msg: "Coupon created Successfully!" });
  //   });
};

exports.emptyCart = (req, res) => {
  // const { image_name, image_url } = req.body;
  return res.status(200).json({ msg: "This is to empty the cart!" });
};
