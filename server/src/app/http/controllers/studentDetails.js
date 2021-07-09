const md5 = require("md5");
const db = require("../../config/dbConnection");

module.exports.updateDetails = (req, res) => {
  const userObj = {
    user_first_name: req.body.user_first_name,
    user_last_name: req.body.user_last_name,
    // user_inst_id: req.user.id,     --- non editable field.
    user_hash: md5(req.body.password),
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
      "SELECT user_id FROM user_detail WHERE user_id = ?",
      req.user.id,
      async (err, rows) => {
        if (err) {
          console.log("Error Occured!");
          return res.status(200).json({ flag: 2, msg: err });
        }

        if (rows.length < 1) {
          return res.status(200).json({ flag: 2, msg: "Bad request!" });
        }

        db.query(
          "UPDATE user_detail SET ? WHERE user_id = ?",
          [userObj, req.user.id],
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

            return res.status(200).json({
              flag: 1,
              msg: `User: ${req.user.id} updated Successfully`,
            });
          }
        );
      }
    );
  } catch (error) {
    return res
      .status(200)
      .json({ flag: 1, msg: `User: ${user_id} updated Successfully` });
  }
};
