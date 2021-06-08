const db = require("../../config/dbConnection");

exports.allStudents = (req, res) => {
  db.query(
    "SELECT user_id, user_first_name, user_email FROM user_detail WHERE user_inst_id = ?",
    [req.user.id],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.json({ msg: "An error occured, please try again!" });
      }

      if (rows.length < 1) {
        return res
          .status(400)
          .json({ msg: "Currently, you have no students!" });
      }

      return res.json(rows);
    }
  );
};
