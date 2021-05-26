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

      var product = {
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
      db.query("INSERT INTO products SET ?", product, (err, results) => {
        if (err) {
          console.log(err);
          return res.json({ msg: "db error Occured!" });
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
