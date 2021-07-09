const db = require("../../config/dbConnection");
const { addRating, removeRating } = require("../../helpers/avgRating");

// Allot Course To students;
exports.allotCourse = (req, res) => {
  var sql = "",
    institute = req.user.id,
    course_id = req.body.course_id,
    student = -1,
    price_before_coupon,
    amount;

  const studentsList = req.body.students;
  console.log(institute);

  try {
    sql = "SELECT * FROM products WHERE id = ? AND issued_by = ?";
    db.query(sql, [course_id, institute], (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "Internal Server error occured!" });
      }

      if (rows.length < 1) {
        return res.status(200).json({
          flag: 2,
          msg: "Sorry, The product you want to allot is not available.",
        });
      }

      price_before_coupon = rows[0].price;

      studentsList.forEach((student) => {
        const ordersObj = {
          user_id: student,
          published_by: institute,
          product_id: course_id,
          order_status: "processed",
          method_of_payment: "Admin",
          price_before_coupon: price_before_coupon,
          amount: price_before_coupon,
        };

        // Insert all these entries to orders table

        sql = "INSERT orders SET ?";
        db.query(sql, ordersObj, (err, results) => {
          if (err) {
            console.log(err);
            return res
              .status(200)
              .json({ flag: 2, msg: "Internal Server error occured!" });
          }

          if (results.affectedRows < 1) {
            return res.status(200).json({
              flag: 2,
              msg: "Operation failed, please try again!",
            });
          }

          console.log(results);
        });
      });

      return res.status(200).json({ flag: 1, msg: "Success!" });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

// Admin Routes
exports.adminProducts = (req, res) => {
  const institute_id = req.user.id;

  try {
    var sql =
      "SELECT products.*, institute_details.name FROM products LEFT JOIN institute_details ON products.issued_by = institute_details.id WHERE issued_by = ?";

    db.query(sql, institute_id, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "Internal Server error occured!" });
      }

      if (results.length < 1) {
        return res
          .status(200)
          .json({ flag: 2, msg: "There are no products to display" });
      }

      // const productList = prodList(results);

      return res.status(200).json({ flag: 1, products: results });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

exports.studentProducts = (req, res) => {
  var sql = "";
  user = req.user.id;

  try {
    sql =
      "SELECT products.* FROM orders RIGHT JOIN products ON orders.product_id = products.id WHERE user_id = ?";
    db.query(sql, user, (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "Internal Server error occured!" });
      }

      if (rows.length < 1) {
        return res
          .status(200)
          .json({ flag: 2, msg: "You haven't purchased any product yet!" });
      }

      return res.status(200).json({ flag: 1, products: rows });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

exports.uploadImage = (req, res) => {
  try {
    console.log(req.file);
    // console.log(req.file.location);
    return res.status(200).json({ flag: 1, details: req.file.location });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

exports.createProduct = (req, res) => {
  const productObj = {
    issued_by: req.user.id,
    image_name: req.body.image_name,
    image_url: req.body.image_url,
    product_name: req.body.product_name,
    creator_name: req.body.creator_name,
    product_type: req.body.product_type,
    category: req.body.category,
    sub_category: req.body.sub_category,
    label: req.body.label,
    status: req.body.status,
    tot_students: 101,
    short_description: req.body.short_description,
    description: req.body.description,
    you_will_learn: req.body.you_will_learn,
    this_includes: req.body.this_includes,
    pre_requisites: req.body.pre_requisites,
    set_currency: req.body.set_currency,
    price: req.body.price,
    course_rating: 0,
    tot_ratings: 0,
  };

  try {
    db.query(
      "SELECT * FROM products WHERE product_name = ? AND issued_by = ?",
      [productObj.product_name, req.user.id],
      async (err, results) => {
        if (err) {
          console.log("Error Occured!");
          return res.status(200).json({ flag: 2, msg: err });
        }

        if (results.length > 0) {
          return res.status(200).json({
            flag: 2,
            msg: "A Product Already exists by this name! Please try with different name",
          });
        }

        if (req.body.discount) {
          productObj.discount = req.body.discount;
        } else {
          productObj.discount = 0;
        }

        console.log(productObj);

        db.query("INSERT INTO products SET ?", productObj, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(200).json({
              flag: 2,
              msg: "db error Occured while creating a product!",
            });
          }

          db.query(
            "SELECT * FROM products WHERE id = ?",
            results.insertId,
            (err, productData) => {
              console.log("Product is Added to the database!");
              return res.status(200).json({ flag: 1, details: productData });
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

exports.productDetails = (req, res) => {
  const product_id = req.params.id;
  var institute_id = -1;

  if (req.user === undefined) {
    // This is a user
    institute_id = parseInt(req.query.institute);
    // console.log(typeof institute_id);
    if (!institute_id || !(typeof institute_id === "number")) {
      return res.status(200).json({
        flag: 2,
        msg: 'Invalid request, please pass "institute" parameter.',
      });
    }
  } else if (req.user.role === "admin") {
    // This is an admin
    institute_id = req.user.id;
  } else {
    return res.status(200).json({ flag: 2, msg: "Bad request!" });
  }

  try {
    var sql =
      "SELECT categories.name as category_name, cat2.name as sub_category_name, products.* FROM products LEFT JOIN categories ON categories.id = products.category LEFT JOIN categories cat2 ON cat2.id = products.sub_category WHERE products.id = ? AND issued_by = ?";

    db.query(sql, [product_id, institute_id], (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(200).json({
          flag: 2,
          msg: "An error occured while fetching product Details",
        });
      }

      if (rows.length < 1) {
        return res
          .status(200)
          .json({ flag: 2, msg: "There are no such products!" });
      }

      rows = rows.map((item) => {
        console.log("its workin!");

        sql = "SELECT * FROM resources WHERE product_id = ?";

        db.query(sql, product_id, (err, rows) => {
          item.content = rows;

          return res.status(200).json({ flag: 1, details: item });
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

exports.enrolledStudents = (req, res) => {
  var institute = req.user.id,
    product_id = req.params.id,
    sql = "";

  try {
    sql =
      "SELECT user_detail.* FROM orders RIGHT JOIN user_detail ON orders.user_id = user_detail.user_id WHERE published_by = ? AND product_id = ?";
    db.query(sql, [institute, product_id], (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "An Error occured getting your data!" });
      }

      return res.status(200).json({ flag: 1, students: rows });
    });

    // return res.status(200).json({ flag: 1, msg: "Api workin!" });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

exports.productUpdate = (req, res) => {
  const product_id = req.params.id;

  const productObj = {
    image_name: req.body.image_name,
    image_url: req.body.image_url,
    product_name: req.body.product_name,
    creator_name: req.body.creator_name,
    product_type: req.body.product_type,
    category: req.body.category,
    sub_category: req.body.sub_category,
    label: req.body.label,
    status: req.body.status,
    short_description: req.body.short_description,
    description: req.body.description,
    you_will_learn: req.body.you_will_learn,
    this_includes: req.body.this_includes,
    pre_requisites: req.body.pre_requisites,
    set_currency: req.body.set_currency,
    price: req.body.price,
  };

  if (!req.body.discount) {
    productObj.discount = req.body.discount;
  } else {
    productObj.discount = 0;
  }

  try {
    const sql = `UPDATE products SET ? WHERE id = ${product_id} AND issued_by = ${req.user.id}`;

    db.query(sql, productObj, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "An Error occured while updating" });
      }

      if (results.affectedRows < 1) {
        console.log();
        return res
          .status(200)
          .json({ flag: 2, msg: "Invalid request, please try again!" });
      }

      console.log(results);
      return res.status(200).json({ flag: 1, msg: "Updated successfully!" });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

exports.deleteProduct = (req, res) => {
  try {
    db.query(
      "SELECT * FROM products WHERE id = ? and issued_by = ?",
      [req.params.id, req.user.id],
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(200).json({
            flag: 2,
            msg: "An Error occured while deleting the product!",
          });
        }

        if (results == 0) {
          return res.status(200).json({
            flag: 2,
            msg: "You are not authorized to delete this product",
          });
        }

        db.query(
          "DELETE FROM products WHERE id = ?",
          req.params.id,
          (err, results) => {
            if (err) {
              console.log(err);
              return res
                .status(200)
                .json({ flag: 2, msg: "An error occured while deleting!" });
            }

            console.log(results);

            msg = `product ${req.params.id} published by ${req.user.id} is successfully deleted!`;

            return res.status(200).json({ flag: 1, msg });
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

// Students Routes

exports.studentMarketplace = (req, res) => {
  const institute_id = parseInt(req.query.institute);

  console.log(typeof institute_id);
  if (!institute_id || !(typeof institute_id === "number")) {
    return res.status(200).json({
      flag: 2,
      msg: 'Invalid request, please pass "institute" parameter.',
    });
  }

  console.log(req.query);

  try {
    sql =
      "SELECT institute_details.name as institute_name, products.* FROM products LEFT JOIN institute_details ON products.issued_by = institute_details.id WHERE issued_by = ?";

    db.query(sql, institute_id, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "Internal Server error occured!" });
      }

      if (results.length < 1) {
        return res
          .status(200)
          .json({ flag: 1, msg: "There are no products to display" });
      }

      return res.status(200).json({ flag: 1, products: results });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

// ! Product Content Routes
exports.uploadResource = (req, res) => {
  try {
    const resourceObj = {
      product_id: req.params.id,
      resource_type: req.body.resource_type,
      is_paid: req.body.is_paid,
      section_name: req.body.section_name,
      resource_name: req.body.resource_name,
      image_url: req.body.image_url,
      resource_url: req.body.resource_url,
      rating: 5,
    };

    var sql = "SELECT * FROM products WHERE id = ? AND issued_by = ?";
    db.query(sql, [resourceObj.product_id, req.user.id], (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "Internal Server error occured!" });
      }

      if (rows.length < 1) {
        return res
          .status(200)
          .json({ flag: 2, msg: "Sorry, this product doesn't belong to you" });
      }

      console.log("Product belongs to you!");

      sql = "INSERT INTO resources SET ?";
      db.query(sql, resourceObj, (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(200)
            .json({ flag: 2, msg: "Internal Server error occured!" });
        }

        if (results.affectedRows < 1) {
          return res.status(200).json({
            flag: 2,
            msg: "Video has not been uploaded, please try again!",
          });
        }

        return res.status(200).json({
          flag: 1,
          msg: "Video uploaded Successfully!",
          details: results,
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

exports.deleteResource = (req, res) => {
  try {
    const product_id = req.params.id;
    const resource = req.params.resource;

    var sql = "SELECT * FROM products WHERE id = ? AND issued_by = ?";
    db.query(sql, [product_id, req.user.id], (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "Internal Server error occured!" });
      }

      if (rows.length < 1) {
        return res
          .status(200)
          .json({ flag: 2, msg: "Sorry, this product doesn't belong to you" });
      }

      console.log("Product belongs to you!");

      sql = "DELETE FROM resources WHERE id = ?";
      db.query(sql, resource, (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(200)
            .json({ flag: 2, msg: "Internal Server error occured!" });
        }

        if (results.affectedRows < 1) {
          return res.status(200).json({
            flag: 2,
            msg: "Video has not delete yet, please try again!",
          });
        }

        return res
          .status(200)
          .json({ flag: 1, msg: "Video deleted Successfully!" });
      });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

// ? Product Reviews

exports.allReviews = (req, res) => {
  var product = req.params.id;

  try {
    sql = "SELECT * FROM ratings WHERE product_id = ?";
    db.query(sql, [product], (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "Internal Server error occured!" });
      }

      if (rows.length < 1) {
        return res.status(200).json({
          flag: 2,
          msg: "No reviews yet on this product.",
        });
      }
      return res.status(200).json({ flag: 1, reviews: rows });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

exports.addReview = (req, res) => {
  var user = req.user.id,
    content = req.params.content,
    product = req.params.id,
    sql = "",
    productObj = {},
    tot_ratings,
    course_rating;

  try {
    // Insert Review
    const reviewObject = {
      user_id: user,
      product_id: product,
      content_id: content,
      rating: req.body.rating,
      title: req.body.title,
      description: req.body.description,
    };

    sql = "SELECT * FROM ratings WHERE user_id = ? AND content_id = ?";
    db.query(sql, [user, content], (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "Internal Server error occured!" });
      }

      if (rows.length > 0) {
        return res.status(200).json({
          flag: 2,
          msg: "You can post review only once.",
        });
      }

      sql = "INSERT INTO ratings SET ?";
      db.query(sql, reviewObject, (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(200)
            .json({ flag: 2, msg: "Internal Server error occured!" });
        }

        if (results.affectedRows < 1) {
          return res.status(200).json({
            flag: 2,
            msg: "Please try again!",
          });
        }

        sql = "SELECT * FROM products WHERE id = ?";
        db.query(sql, product, (err, rows) => {
          if (err) {
            console.log(err);
            return res
              .status(200)
              .json({ flag: 2, msg: "Internal Server error occured!" });
          }

          tot_ratings = rows[0].tot_ratings;
          course_rating = rows[0].course_rating;

          productObj = {
            ...rows[0],
            course_rating: addRating(
              course_rating,
              tot_ratings,
              reviewObject.rating
            ),
            tot_ratings: tot_ratings + 1,
          };

          sql = "UPDATE products SET ? WHERE id = ?";
          db.query(sql, [productObj, product], (err, results) => {
            if (err) {
              console.log(err);
              return res
                .status(200)
                .json({ flag: 2, msg: "Internal Server error occured!" });
            }

            return res
              .status(200)
              .json({ flag: 1, msg: "Review has been added!" });
          });
        });
      });
    });

    // console.log(user, product, review);
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

exports.deleteReview = (req, res) => {
  var product = req.params.id,
    content = req.params.content,
    sql = "",
    user = req.user.id,
    newRating = 0;

  try {
    console.log(product, content);

    sql = "SELECT * FROM ratings WHERE user_id = ? AND content_id = ?";
    db.query(sql, [user, content], (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "Internal Server error occured!" });
      }

      if (rows.length < 1) {
        console.log(err);
        return res.status(200).json({ flag: 2, msg: "Bad request!" });
      }

      newRating = rows[0].rating;

      sql = "DELETE FROM ratings WHERE user_id = ? AND content_id = ?";
      db.query(sql, [user, content], (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(200)
            .json({ flag: 2, msg: "Internal Server error occured!" });
        }

        sql = "SELECT * FROM products WHERE id = ?";
        db.query(sql, product, (err, rows) => {
          if (err) {
            console.log(err);
            return res
              .status(200)
              .json({ flag: 2, msg: "Internal Server error occured!" });
          }

          tot_ratings = rows[0].tot_ratings;
          course_rating = rows[0].course_rating;

          productObj = {
            ...rows[0],
            tot_ratings: tot_ratings - 1,
            course_rating: removeRating(course_rating, tot_ratings, newRating),
          };

          sql = "UPDATE products SET ? WHERE id = ?";
          db.query(sql, [productObj, product], (err, results) => {
            if (err) {
              console.log(err);
              return res
                .status(200)
                .json({ flag: 2, msg: "Internal Server error occured!" });
            }

            return res
              .status(200)
              .json({ flag: 1, msg: "Review has been deleted!" });
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
