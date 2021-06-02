const db = require("../../config/dbConnection");

exports.products = (req, res) => {
  console.log(req.user);
  // console.log(req.cookies);
  console.log(req.user.id);

  db.query(
    "SELECT * FROM products WHERE issued_by = ?",
    req.user.id,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.json({ msg: "Bad Request!" });
      }

      return res.json(results);
    }
  );
};

exports.createProduct = (req, res) => {
  const {
    image_name,
    image_url,
    product_name,
    creator_name,
    category,
    sub_category,
    label,
    status,
    tot_students,
    description,
    you_will_learn,
    this_includes,
    pre_requisites,
    set_currency,
    price,
    course_rating,
    tot_ratings,
  } = req.body;

  db.query(
    "SELECT * FROM products WHERE product_name = ? AND issued_by = ?",
    [product_name, req.user.id],
    async (err, results) => {
      if (err) {
        console.log("Error Occured!");
        return res.json({ msg: err });
      }

      if (results.length > 0) {
        return res.json({
          msg: "A Product Already exists by this name! Please try with different name",
        });
      }

      const product = {
        issued_by: req.user.id,
        image_name,
        image_url,
        product_name,
        creator_name,
        category,
        sub_category,
        label,
        status,
        tot_students,
        description,
        you_will_learn,
        this_includes,
        pre_requisites,
        set_currency,
        price,
        course_rating,
        tot_ratings,
      };

      // console.log(product);

      db.query("INSERT INTO products SET ?", product, (err, results) => {
        if (err) {
          console.log(err);
          return res.json({
            msg: "db error Occured while creating a product!",
          });
        }

        db.query(
          "SELECT * FROM products WHERE id = ?",
          results.insertId,
          (err, productData) => {
            console.log("Product is Added to the database!");
            return res.json(productData);
          }
        );
      });
    }
  );
};

exports.productDetails = (req, res) => {
  db.query(
    "SELECT * FROM products WHERE id = ?",
    req.params.id,
    (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ msg: "An error occured while fetching product Details" });
      }

      return res.status(200).json(results);
    }
  );
};

exports.productUpdate = (req, res) => {
  const {
    image_name,
    image_url,
    product_name,
    creator_name,
    category,
    sub_category,
    label,
    status,
    tot_students,
    description,
    you_will_learn,
    this_includes,
    pre_requisites,
    set_currency,
    price,
    course_rating,
    tot_ratings,
  } = req.body;

  // const productUpdate = {
  //   issued_by: req.user.id,
  //   image_name,
  //   image_url,
  //   product_name,
  //   creator_name,
  //   category,
  //   sub_category,
  //   label,
  //   status,
  //   tot_students,
  //   description,
  //   you_will_learn,
  //   this_includes,
  //   pre_requisites,
  //   set_currency,
  //   price,
  //   course_rating,
  //   tot_ratings,
  // };

  let sql_string =
    "UPDATE products SET issued_by = ?, image_name = ?, image_url = ?, product_name = ?, creator_name = ?, category = ?, sub_category = ?, label = ?, status = ?, tot_students = ?, description = ?, you_will_learn = ?, this_includes = ?, pre_requisites = ?, set_currency = ?, price = ?, course_rating = ?, tot_ratings WHERE id = ?";
  let string_values = [
    req.user.id,
    image_name,
    image_url,
    product_name,
    creator_name,
    category,
    sub_category,
    label,
    status,
    tot_students,
    description,
    you_will_learn,
    this_includes,
    pre_requisites,
    set_currency,
    price,
    course_rating,
    tot_ratings,
    req.params.id,
  ];

  db.query(sql_string, string_values, (err, results) => {
    if (err) {
      console.log(err);
      return res.json({ msg: "An Error occured while updating" });
    }

    return res.status(200).json(results);
  });
};

exports.deleteProduct = (req, res) => {
  db.query(
    "SELECT * FROM products WHERE id = ? and issued_by = ?",
    [req.params.id, req.user.id],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.json({
          msg: "An Error occured while deleting the product!",
        });
      }

      if (results == 0) {
        return res.json({
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
              .status(400)
              .json({ msg: "An error occured while deleting!" });
          }

          console.log(results);

          return res.status(200).json({
            msg: `product ${req.params.id} published by ${req.user.id} is successfully deleted!`,
          });
        }
      );
    }
  );
};
