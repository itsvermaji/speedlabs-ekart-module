const db = require("../../config/dbConnection");

exports.getCartItems = async (req, res) => {
  // const sql =
  //   "SELECT cart_id, coupon_code, products.id as product_id, product_name, creator_name, issued_by, price, net_price FROM user_carts LEFT JOIN products ON user_carts.product_id = products.id WHERE cart_id = ? ORDER by cart_id";

  // const sql =
  //   "SELECT user_carts.id as cart_id, user_id, product_id, coupon_code, net_price FROM user_carts RIGHT JOIN cart_contents ON user_carts.id = cart_contents.cart_id WHERE user_id = ? ORDER by user_id";

  // const sql =
  // "SELECT * FROM user_detail LEFT JOIN products ON user_detail.user_inst_id = products.issued_by WHERE user_id = ? AND products.id = ?";

  // product_name, product_net price, product_issuedby, coupon_code,

  let cartItems;
  let cart_id;

  const sql = "SELECT * FROM user_carts WHERE user_id = ?";
  db.query(sql, req.user.id, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ msg: "An error occured!" });
    }

    // Make Cart_Items object to display all the cart Information!
    cart_id = rows[0].id;
    cartItems = rows[0];

    db.query(
      "SELECT * FROM cart_contents WHERE cart_id = ?",
      cart_id,
      (err, rows) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .json({ msg: "An error occured! while getting your cart Items!" });
        }

        cartItems.Items = rows;
        console.log(cartItems);
        return res.status(200).json(cartItems);
      }
    );
  });
};

exports.addItemToCart = (req, res) => {
  // First Check if the Product exists in the institute to which the user belongs.
  // Then check if the cart already exists.

  // If Cart already exists then just add the entry to the cart_contents.

  const { product_id, coupon_code } = req.body;
  var total_amt = 0,
    net_product_price = 0,
    product_price;

  db.query(
    "SELECT * FROM user_carts WHERE user_id = ?",
    req.user.id,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ msg: "Error occured while getting your cart!" });
      }

      // console.log(rows, "rows  obj");
      if (rows.length == 0) {
        return res.status(400).json({
          msg: "You can't make any purchase, please contact your admin!",
        });
      }
      cart_id = rows[0].id;
      total_amt = rows[0].total_amt;
      console.log(cart_id, "is the cart id");

      // Then check if the product is already into the cart!
      const sql =
        "SELECT * FROM user_detail LEFT JOIN products ON user_detail.user_inst_id = products.issued_by WHERE user_id = ? AND products.id = ?";

      db.query(sql, [req.user.id, product_id], (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ msg: "An error occured!" });
        }

        // console.log("Total Products by your institute: ", rows.length);
        // console.log(rows);
        if (rows.length == 0) {
          return res.status(400).json({
            msg: "Sorry, this product is not available for your institute, please contact your institute admin!",
          });
        }

        // Getting the product price!
        product_price = rows[0].price;

        // Check if the product is already in the cart.
        db.query(
          "SELECT * FROM cart_contents WHERE cart_id = ? AND product_id = ?",
          [cart_id, product_id],
          (err, rows) => {
            if (err) {
              console.log(err);
              return res.status(400).json({
                msg: "An error occured!",
              });
            }

            // Product has already been added to the cart!
            if (rows.length > 0) {
              return res
                .status(200)
                .json({ msg: "Product already added to the cart!" });
            }

            // Getting net product price!
            net_product_price = product_price;
            console.log("You can add product to the cart!");

            // Now we need to insert that product to cart contents.
            const cartContent = {
              cart_id,
              product_id,
              net_price: product_price,
            };

            db.query(
              "INSERT INTO cart_contents SET ?",
              cartContent,
              (err, row) => {
                if (err) {
                  console.log(err);
                  return res.status(400).json({
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
                  .json({ msg: "Product added to the cart!" });
              }
            );
          }
        );
      });
    }
  );
};

exports.removeItemFromCart = (req, res) => {
  const product_id = req.params.id;
  console.log(product_id);
  console.log();
  var cart_id = 0,
    product_net_price = 0,
    total_amt = 0;

  db.query(
    "SELECT * FROM user_carts WHERE user_id = ?",
    req.user.id,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ msg: "An error occured! while getting your cart Items!" });
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
            return res.status(400).json({
              msg: "An error occured! while getting your cart Items!",
            });
          }

          if (rows.length == 0) {
            return res.status(400).json({
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
                return res.status(400).json({
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
                    return res.status(400).json({
                      msg: "An error occured! while updating your cart items!",
                    });
                  }

                  return res
                    .status(200)
                    .json({ msg: "Product removed from your cart!" });
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
};

exports.applyCoupon = (req, res) => {
  return res.status(200).json({ msg: "Apply Coupon Code?" });
};

exports.removeCoupon = (req, res) => {
  return res.status(200).json({ msg: "Coupon Removed?" });
};

exports.emptyCart = (req, res) => {
  var total_amt = 0,
    cart_id;

  db.query(
    "SELECT * from user_carts WHERE user_id = ?",
    req.user.id,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ msg: "An error occured! while getting your cart Items!" });
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
              .status(400)
              .json({ msg: "An error occured while deleting!" });
          }

          total_amt = 0;
          db.query(
            "UPDATE user_carts SET total_amt = ? WHERE id = ?",
            [total_amt, cart_id],
            (err, rows) => {
              if (err) {
                console.log(err);
                return res
                  .status(400)
                  .json({ msg: "An error occured, please try again!" });
              }

              return res.status(200).json({ msg: "Cart is emptied!" });
            }
          );
        }
      );
    }
  );
};
