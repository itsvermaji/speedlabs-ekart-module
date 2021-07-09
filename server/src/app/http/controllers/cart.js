const db = require("../../config/dbConnection");
const { discountPrice } = require("../../helpers/coupon");
const crypto = require("crypto");
const { generateSignature } = require("../../helpers/generateSignature");
const Razorpay = require("razorpay");

exports.getCartItems = async (req, res) => {
  let cartItems;
  let cart_id;

  try {
    const sql = "SELECT * FROM user_carts WHERE user_id = ?";
    db.query(sql, req.user.id, (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(200).json({ flag: 2, msg: "An error occured!" });
      }

      if (rows.length < 1) {
        return res.status(200).json({
          flag: 2,
          msg: "Your cart has not been initialized, please contact your admin!",
        });
      }

      // Make Cart_Items object to display all the cart Information!

      console.log("rows", rows);
      cart_id = rows[0].id;
      cartItems = rows[0];

      db.query(
        "SELECT coupons.coupon_code as coupon_name, products.image_name, products.image_url, product_name, creator_name, cart_contents.* FROM cart_contents LEFT JOIN products ON cart_contents.product_id = products.id LEFT JOIN coupons ON cart_contents.coupon_id = coupons.id WHERE cart_id = ?",
        cart_id,
        (err, rows) => {
          if (err) {
            console.log(err);
            return res.status(200).json({
              flag: 2,
              msg: "An error occured! while getting your cart Items!",
            });
          }

          cartItems.Items = rows;
          console.log(cartItems);

          return res.status(200).json({ flag: 1, cartItems });
        }
      );
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

exports.addItemToCart = (req, res) => {
  // First Check if the Product exists in the institute to which the user belongs.
  // Then check if the cart already exists.

  // If Cart already exists then just add the entry to the cart_contents.

  const { product_id } = req.body;
  var total_amt = 0,
    net_product_price = 0,
    product_price = 0,
    initial_discount = 0,
    sql = "";

  try {
    db.query(
      "SELECT * FROM user_carts WHERE user_id = ?",
      req.user.id,
      (err, rows) => {
        if (err) {
          console.log(err);
          return res
            .status(200)
            .json({ flag: 2, msg: "Error occured while getting your cart!" });
        }

        // console.log(rows, "rows  obj");
        if (rows.length == 0) {
          return res.status(200).json({
            flag: 2,
            msg: "You can't make any purchase, please contact your admin!",
          });
        }
        cart_id = rows[0].id;
        total_amt = rows[0].total_amt;
        console.log(cart_id, "is the cart id");

        // Then check if the product is already into the cart!
        sql =
          "SELECT * FROM user_detail LEFT JOIN products ON user_detail.user_inst_id = products.issued_by WHERE user_id = ? AND products.id = ?";

        db.query(sql, [req.user.id, product_id], (err, rows) => {
          if (err) {
            console.log(err);
            return res.status(200).json({ flag: 2, msg: "An error occured!" });
          }

          // console.log("Total Products by your institute: ", rows.length);
          // console.log(rows);
          if (rows.length == 0) {
            return res.status(200).json({
              flag: 2,
              msg: "Sorry, this product is not available for your institute, please contact your institute admin!",
            });
          }

          // Getting the product price!
          product_price = rows[0].price;
          initial_discount = rows[0].discount;

          // Check if the product is already in the cart.
          db.query(
            "SELECT * FROM cart_contents WHERE cart_id = ? AND product_id = ?",
            [cart_id, product_id],
            (err, rows) => {
              if (err) {
                console.log(err);
                return res.status(200).json({
                  flag: 2,
                  msg: "An error occured!",
                });
              }

              // Product has already been added to the cart!
              if (rows.length > 0) {
                return res
                  .status(200)
                  .json({ flag: 2, msg: "Product already added to the cart!" });
              }

              sql =
                "SELECT id FROM orders WHERE user_id = ? AND product_id = ?";
              db.query(sql, [req.user.id, product_id], (err, rows) => {
                if (err) {
                  console.log(err);
                  return res.status(200).json({
                    flag: 2,
                    msg: "An error occured!",
                  });
                }

                // Product has already been added to the cart!
                if (rows.length > 0) {
                  return res.status(200).json({
                    flag: 2,
                    msg: "You can't add an already purchased product to the cart!",
                  });
                }

                // Getting net product price!
                // net_product_price = product_price;
                net_product_price = discountPrice(
                  product_price,
                  initial_discount
                );
                // console.log(net_product_price);
                console.log("You can add product to the cart!");

                // Now we need to insert that product to cart contents.
                const cartContent = {
                  cart_id,
                  product_id,
                  price_before_coupon: net_product_price,
                  net_price: net_product_price,
                };

                db.query(
                  "INSERT INTO cart_contents SET ?",
                  cartContent,
                  (err, row) => {
                    if (err) {
                      console.log(err);
                      return res.status(200).json({
                        flag: 2,
                        msg: "An error occured, while adding product to the cart",
                      });
                    }

                    total_amt = total_amt + net_product_price;
                    db.query(
                      "UPDATE user_carts SET total_amt = ? WHERE id = ?",
                      [total_amt, cart_id],
                      (err, row) => {
                        console.log(row);
                      }
                    );

                    return res
                      .status(200)
                      .json({ flag: 1, msg: "Product added to the cart!" });
                  }
                );
              });
            }
          );
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

exports.removeItemFromCart = (req, res) => {
  const product_id = req.params.id;
  var cart_id = 0,
    product_net_price = 0,
    total_amt = 0;

  try {
    db.query(
      "SELECT * FROM user_carts WHERE user_id = ?",
      req.user.id,
      (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(200).json({
            flag: 2,
            msg: "An error occured! while getting your cart Items!",
          });
        }

        // Setting the cart id
        cart_id = rows[0].id;
        total_amt = rows[0].total_amt;

        db.query(
          "SELECT * FROM cart_contents WHERE cart_id = ? AND product_id = ?",
          [cart_id, product_id],
          (err, rows) => {
            if (err) {
              console.log(err);
              return res.status(200).json({
                flag: 2,
                msg: "An error occured! while getting your cart Items!",
              });
            }

            if (rows.length == 0) {
              return res.status(200).json({
                flag: 2,
                msg: "Sorry this product doesn't exist in your cart. Please contact your admin!",
              });
            }

            // Product exists in your cart!
            product_net_price = rows[0].net_price;
            console.log(product_net_price);

            // Setting product_net_price
            db.query(
              "DELETE FROM cart_contents WHERE cart_id = ? AND product_id = ?",
              [cart_id, product_id],
              (err, rows) => {
                if (err) {
                  console.log(err);
                  return res.status(200).json({
                    flag: 2,
                    msg: "An error occured! while deleting your Items!",
                  });
                }

                // Changing cart total amount
                console.log("Item Deleted");
                console.log(
                  total_amt,
                  product_net_price,
                  total_amt - product_net_price
                );

                total_amt = total_amt - product_net_price;
                console.log(total_amt);
                db.query(
                  "UPDATE user_carts SET total_amt = ? WHERE user_id = ?",
                  [total_amt, req.user.id],
                  (err, rows) => {
                    if (err) {
                      console.log(err);
                      return res.status(200).json({
                        flag: 2,
                        msg: "An error occured! while updating your cart items!",
                      });
                    }

                    return res.status(200).json({
                      flag: 1,
                      msg: "Product removed from your cart!",
                    });
                  }
                );
              }
            );

            // Remove product from the cart and update the cart.
          }
        );

        console.log(rows);
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

exports.emptyCart = (req, res) => {
  var total_amt = 0,
    cart_id;

  try {
    db.query(
      "SELECT * from user_carts WHERE user_id = ?",
      req.user.id,
      (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(200).json({
            flag: 2,
            msg: "An error occured! while getting your cart Items!",
          });
        }

        // Assiging Cart Id
        cart_id = rows[0].id;
        total_amt = rows[0].total_amt;
        console.log(total_amt);
        db.query(
          "DELETE FROM cart_contents WHERE cart_id = ?",
          cart_id,
          (err, rows) => {
            if (err) {
              console.log(err);
              return res
                .status(200)
                .json({ flag: 2, msg: "An error occured while deleting!" });
            }

            total_amt = 0;
            db.query(
              "UPDATE user_carts SET total_amt = ? WHERE id = ?",
              [total_amt, cart_id],
              (err, rows) => {
                if (err) {
                  console.log(err);
                  return res.status(200).json({
                    flag: 2,
                    msg: "An error occured, please try again!",
                  });
                }

                return res
                  .status(200)
                  .json({ flag: 1, msg: "Cart is emptied!" });
              }
            );
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

module.exports.checkout = (req, res) => {
  var sql = "",
    product_id = 0,
    count = 0,
    cart_id = 0,
    price_before_coupon = 0,
    published_by;

  try {
    const { order_id, payment_id, payment_secret, amount, currency, receipt } =
      req.body;

    if (payment_secret !== "S&xd!rstpLw!+w#u$EDnY_K^=UCah-?EBncknj35") {
      return res.status(200).json({ flag: 2, msg: "Payment not verified!" });
    }

    // Put all the orders to myproducts
    // Clear the cart.

    sql =
      "SELECT * FROM user_carts RIGHT JOIN cart_contents ON user_carts.id = cart_contents.cart_id WHERE user_carts.user_id = ?";
    db.query(sql, req.user.id, (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "An error occured while getting cart Items!" });
      }

      if (rows.length < 1) {
        return res
          .status(200)
          .json({ flag: 2, msg: "Please add items to your cart!" });
      }

      console.log(rows);
      cart_id = rows[0].id;
      console.log(cart_id);

      rows.forEach((cartItem) => {
        product_id = cartItem.product_id;
        price_before_coupon = cartItem.price_before_coupon;

        sql = "SELECT price, issued_by FROM products WHERE id = ?";
        db.query(sql, product_id, (err, rows) => {
          if (err) {
            console.log(err);
            return res
              .status(200)
              .json({ flag: 2, msg: "An error occured while deleting!" });
          }

          if (rows.length < 1) {
            return res
              .status(200)
              .json({ flag: 2, msg: "Add some products to your cart!" });
          }

          published_by = rows[0].issued_by;

          const ordersObj = {
            invoice_number: "UIEHIFS3023JF",
            user_id: req.user.id,
            published_by: published_by,
            order_id: req.body.order_id,
            currency: req.body.currency,
            payment_id: req.body.payment_id,
            product_id: cartItem.product_id,
            order_status: "processed",
            method_of_payment: "Online",
            from_bank_ac: "Himani",
            to_bank_ac: "Speedlabs",
            coupon_id: cartItem.coupon_id,
            price_before_coupon: price_before_coupon,
            amount: cartItem.net_price,
          };

          // console.log(ordersObj);

          sql = "INSERT INTO orders SET ?";
          db.query(sql, ordersObj, (err, rows) => {
            // console.log("first inserted");
            if (err) {
              console.log(err);
              return res
                .status(200)
                .json({ flag: 2, msg: "An error occured while deleting!" });
            }
          });
        });
      });

      sql = "DELETE FROM cart_contents WHERE cart_id = ?";
      db.query(sql, cart_id, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(200).json({
            flag: 2,
            msg: "An error occured while getting cart Items!",
          });
        }

        if (results.affectedRows < 1) {
          return res.status(200).json({
            flag: 2,
            msg: "Some exception occured, please contact your admin!",
          });
        }

        sql = "UPDATE user_carts SET ? WHERE id = ?";
        db.query(sql, [{ total_amt: 0 }, cart_id], (err, results) => {
          if (err) {
            console.log(err);
            return res.status(200).json({
              flag: 2,
              msg: "An error occured while getting cart Items!",
            });
          }

          if (results.affectedRows < 1) {
            return res.status(200).json({
              flag: 2,
              msg: "Some exception occured, please contact your admin!",
            });
          }

          return res.status(200).json({
            flag: 1,
            msg: "Payment verified, now go to my course section!",
          });
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};
