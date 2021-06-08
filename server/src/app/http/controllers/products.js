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
  const product_id = req.params.id;

  db.query(
    "SELECT * FROM products WHERE id = ? AND issued_by = ?",
    [product_id, req.user.id],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ msg: "An error occured while fetching product Details" });
      }

      if (rows.length < 1) {
        return res.status(400).json({ msg: "There are no such products!" });
      }

      return res.status(200).json(rows);
    }
  );
};

exports.productUpdate = (req, res) => {
  const product_id = req.params.id;

  const productObj = {
    image_name: req.body.image_name,
    image_url: req.body.image_url,
    product_name: req.body.product_name,
    creator_name: req.body.creator_name,
    category: req.body.category,
    sub_category: req.body.sub_category,
    label: req.body.label,
    status: req.body.status,
    tot_students: req.body.tot_students,
    description: req.body.description,
    you_will_learn: req.body.you_will_learn,
    this_includes: req.body.this_includes,
    pre_requisites: req.body.pre_requisites,
    set_currency: req.body.set_currency,
    price: req.body.price,
    course_rating: req.body.course_rating,
    tot_ratings: req.body.tot_ratings,
  };

  const sql = `UPDATE products SET ? WHERE id = ${product_id} AND issued_by = ${req.user.id}`;

  db.query(sql, productObj, (err, results) => {
    if (err) {
      console.log(err);
      return res.json({ msg: "An Error occured while updating" });
    }

    if (results.affectedRows < 1) {
      return res
        .status(400)
        .json({ msg: "Invalid request, please try again!" });
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
