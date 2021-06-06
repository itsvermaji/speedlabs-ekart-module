const db = require("../../config/dbConnection");

exports.createCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    created_by: req.user.id,
    parent_id: null,
  };

  if (req.body.parent_id) {
    categoryObj.parent_id = req.body.parent_id;
  }
  // If Parent Id is invalid

  // If Parent Id is valid
  db.query(
    "SELECT * FROM categories WHERE name = ? and created_by = ?",
    [categoryObj.name, req.user.id],
    (err, results) => {
      // console.log(req.user.id + "is logged in!");

      if (err) {
        res.json(err);
      }

      // If category already exists

      if (results.length > 0) {
        return res.json({ msg: "This category already exists!" });
      }

      if (categoryObj.parent_id != null) {
        db.query(
          "Select * FROM categories WHERE id = ? ",
          categoryObj.parent_id,
          (err, results) => {
            if (results.length == 0) {
              return res.json({
                msg: "The Parent category of your category doesn't exist",
              });
            } else if (results.length == 1) {
              db.query(
                "INSERT INTO categories SET ?",
                categoryObj,
                (err, results) => {
                  if (err) {
                    console.log(err);
                    return res.status(400).json({
                      msg: "An error occured while creating new category!",
                    });
                  }

                  console.log(results);
                  return res
                    .status(200)
                    .json({ msg: "Category created Successfully!" });
                }
              );
            }
          }
        );
      } else {
        // Create this category
        db.query(
          "INSERT INTO categories SET ?",
          categoryObj,
          (err, results) => {
            if (err) {
              console.log(err);
              return res
                .status(400)
                .json({ msg: "An error occured while creating new category!" });
            }

            console.log(results);
            return res
              .status(200)
              .json({ msg: "Category created Successfully!" });
          }
        );
      }
    }
  );
};

exports.allCategories = (req, res) => {
  db.query(
    "SELECT * FROM categories WHERE created_by = ?",
    [req.user.id],
    (err, data) => {
      if (err) {
        res.json(err);
      }

      // Institute Data is displayed after successfull registration.
      return res.json(data);
    }
  );
};

exports.deleteCategory = (req, res) => {
  const category_id = req.params.id;

  let sql = `DELETE FROM categories WHERE id = ${category_id} AND created_by = ${req.user.id}`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ msg: "An error occured while deleting category!" });
    }

    if (results.affectedRows < 1) {
      return res.status(400).json({ msg: "Please try again!" });
    }

    console.log(results);
    return res.status(200).json({ msg: "Deleted Successfully!" });
  });
};
