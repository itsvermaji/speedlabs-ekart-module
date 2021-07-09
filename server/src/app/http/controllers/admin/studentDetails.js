const db = require("../../../config/dbConnection");

exports.allStudents = (req, res) => {
  db.query(
    "SELECT user_id, user_first_name, user_last_name, user_email, user_inst_id, user_college_id, country_code, user_contact_no, user_country_name, user_state_name, user_city_name, user_address, zip_code, user_gender, user_dob FROM user_detail WHERE user_inst_id = ?",
    [req.user.id],
    (err, rows) => {
      if (err) {
        console.log(err);
        res
          .status(200)
          .json({ flag: 2, msg: "An error occured, please try again!" });
      }

      if (rows.length < 1) {
        return res
          .status(200)
          .json({ flag: 2, msg: "Currently, you have no students!" });
      }

      return res.status(200).json({ flag: 1, students: rows });
    }
  );
};

exports.studentDetails = (req, res) => {
  student_id = req.params.id;
  var sql = "SELECT * FROM user_detail WHERE user_id = ? AND user_inst_id = ?";
  db.query(sql, [student_id, req.user.id], (err, rows) => {
    if (err) {
      console.log(err);
      res
        .status(200)
        .json({ flag: 2, msg: "An error occured, please try again!" });
    }

    if (rows.length < 1) {
      res.status(200).json({ flag: 2, msg: "No such student is registered!" });
    }

    res.status(200).json({ flag: 1, students: rows });
  });
};

// Update Student details
module.exports.updateStudentDetails = (req, res) => {
  const user_id = req.params.id;
  console.log(user_id, req.user.id);

  const userObj = {
    user_first_name: req.body.user_first_name,
    user_last_name: req.body.user_last_name,
    // user_inst_id: req.user.id,     --- non editable field.
    user_college_id: req.body.user_college_id,
    country_code: req.body.country_code,
    user_contact_no: req.body.user_contact_no,
    user_country_name: req.body.user_country_name,
    user_state_name: req.body.user_state_name,
    user_city_name: req.body.user_city_name,
    user_address: req.body.user_address,
    zip_code: req.body.zip_code,
    user_gender: req.body.user_gender,
    user_dob: req.body.user_dob,
  };

  try {
    db.query(
      "SELECT user_id, user_inst_id FROM user_detail WHERE user_id = ? AND user_inst_id = ?",
      [user_id, req.user.id],
      async (err, rows) => {
        if (err) {
          console.log("Error Occured!");
          return res.status(200).json({ flag: 2, msg: err });
        }

        console.log(rows);
        if (rows.length < 1) {
          return res.status(200).json({ flag: 2, msg: "Bad request!" });
        }

        db.query(
          "UPDATE user_detail SET ? WHERE user_id = ?",
          [userObj, user_id],
          (err, results) => {
            if (err) {
              console.log(err);
              return res
                .status(200)
                .json({ flag: 2, msg: "Internal Server error" });
            }

            if (results.affectedRows < 1) {
              return res.status(200).json({
                flag: 2,
                msg: "Details not updated please try again!",
              });
            }

            return res
              .status(200)
              .json({ flag: 1, msg: `User: ${user_id} updated Successfully` });
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

module.exports.deleteStudent = (req, res) => {
  user_id = req.params.id;
  var sql = "";

  try {
    sql =
      "SELECT user_id, user_inst_id FROM user_detail WHERE user_id = ? AND user_inst_id = ?";
    db.query(sql, [user_id, req.user.id], (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(200).json({ flag: 2, msg: "Internal Server error" });
      }

      if (rows.length < 1) {
        return res.status(200).json({ flag: 2, msg: "Bad request!" });
      }

      // First cart is deleted then user_detail is deleted.

      sql = "DELETE FROM user_carts WHERE user_id = ?";
      db.query(sql, [user_id], (err, results) => {
        if (err) {
          console.log(err);
          return res
            .status(200)
            .json({ flag: 2, msg: "Internal Server error" });
        }

        if (results.affectedRows < 1) {
          return res.status(200).json({ flag: 2, msg: "Bad request!" });
        }

        console.log("Cart delete successfully!");

        sql = "DELETE FROM user_detail WHERE user_id = ?";
        db.query(sql, [user_id], (err, results) => {
          if (err) {
            console.log(err);
            return res
              .status(200)
              .json({ flag: 2, msg: "Internal Server error" });
          }

          if (results.affectedRows < 1) {
            return res.status(200).json({ flag: 2, msg: "Bad request!" });
          }

          return res
            .status(200)
            .json({ flag: 1, msg: `User: ${user_id} deleted Successfully` });
        });
      });
    });
  } catch (error) {
    return res
      .status(200)
      .json({ flag: 2, msg: "Catch: An error occured, please try again!" });
  }
};
