const db = require("../../config/dbConnection");

exports.createCategory = (req, res) => {
  var parent_id = 0;

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

  try {
    db.query(
      "SELECT * FROM categories WHERE name = ? and created_by = ?",
      [categoryObj.name, req.user.id],
      (err, rows) => {
        // console.log(req.user.id + "is logged in!");

        if (err) {
          return res
            .status(200)
            .json({ flag: 2, msg: "This category already exists!" });
        }

        // If category already exists

        if (rows.length > 0) {
          return res
            .status(200)
            .json({ flag: 2, msg: "This category already exists!" });
        }

        if (categoryObj.parent_id != null) {
          db.query(
            "Select * FROM categories WHERE id = ? AND created_by = ?",
            [categoryObj.parent_id, req.user.id],
            (err, rows) => {
              if (err) {
                return res
                  .status(200)
                  .json({ flag: 2, msg: "This category already exists!" });
              }

              if (rows.length < 1) {
                return res.json({
                  flag: 2,
                  msg: "The Parent category of your category doesn't exist",
                });
              }
              console.log(rows);
              parent_id = rows[0].parent_id;

              if (parent_id !== null) {
                return res.status(200).json({
                  flag: 2,
                  msg: "You can't create sub-category for this category.",
                });
              }

              db.query(
                "INSERT INTO categories SET ?",
                categoryObj,
                (err, results) => {
                  if (err) {
                    console.log(err);
                    return res.status(200).json({
                      flag: 2,
                      msg: "An error occured while creating new category!",
                    });
                  }

                  console.log(results);
                  return res.status(200).json({
                    flag: 1,
                    msg: "Category created Successfully!",
                  });
                }
              );
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
                return res.status(200).json({
                  flag: 2,
                  msg: "An error occured while creating new category!",
                });
              }

              console.log(results);
              return res
                .status(200)
                .json({ flag: 1, msg: "Category created Successfully!" });
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

exports.allCategories = (req, res) => {
  var institute_id = -1;

  if (req.user === undefined) {
    institute_id = parseInt(req.query.institute);
    // console.log(typeof institute_id);
    if (!institute_id || !(typeof institute_id === "number")) {
      return res.status(200).json({
        flag: 2,
        msg: 'Invalid request, please pass "institute" parameter.',
      });
    }
  } else if (req.user.role === "admin") {
    institute_id = req.user.id;
  } else {
    return res.status(200).json({ flag: 2, msg: "Bad request!" });
  }

  try {
    db.query(
      "SELECT * FROM categories WHERE created_by = ?",
      institute_id,
      (err, rows) => {
        if (err) {
          res.json(err);
        }

        if (rows.length < 1) {
          return res.status(200).json({
            flag: 2,
            msg: "Sorry, currently there are no categories!",
          });
        }

        // Institute rows is displayed after successfull registration.
        return res.json(rows);
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};

exports.deleteCategory = (req, res) => {
  const category_id = req.params.id;

  try {
    let sql = `DELETE FROM categories WHERE id = ${category_id} AND created_by = ${req.user.id}`;
    db.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(200)
          .json({ flag: 2, msg: "An error occured while deleting category!" });
      }

      if (results.affectedRows < 1) {
        return res.status(200).json({ flag: 2, msg: "Please try again!" });
      }

      console.log(results);
      return res.status(200).json({ flag: 1, msg: "Deleted Successfully!" });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};
