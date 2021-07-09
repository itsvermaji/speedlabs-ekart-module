const db = require("../../config/dbConnection");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

// Student Registration By admin
module.exports.adminStudentRegistration = (req, res) => {
  console.log("this route ran");

  const userObj = {
    user_first_name: req.body.user_first_name,
    user_last_name: req.body.user_last_name,
    user_email: req.body.user_email,
    user_hash: md5(req.body.password),
    user_college_id: req.body.user_college_id,
    user_inst_id: req.user.id,
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
      "SELECT user_email FROM user_detail WHERE user_email = ?",
      [userObj.user_email],
      async (err, results) => {
        if (err) {
          console.log("Error Occured!");
          return res.status(200).json({ flag: 2, msg: err });
        }

        if (results.length > 0) {
          return res
            .status(200)
            .json({ flag: 2, msg: "Email is already Registered!" });
        }

        // Verify whether the institute exists
        db.query("INSERT INTO user_detail SET ?", userObj, (err, results) => {
          if (err) {
            console.log(err);
            return res
              .status(200)
              .json({ flag: 2, msg: "Internal Server error" });
          }

          // If Results show the id
          db.query(
            "SELECT * FROM user_detail WHERE user_id = ?",
            results.insertId,
            (err, rows) => {
              if (err) {
                console.log(err);
                res.json(err);
              }

              // Loggin the user created
              const user_details = rows[0];
              // console.log("User", rows[0], "created successfully");

              const cartObj = { user_id: results.insertId, total_amt: 0 };
              db.query("INSERT INTO user_carts SET ?", cartObj, (err, row) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ msg: "Internal Server error" });
                }

                console.log(`Cart Id: ${row.insertId} created successfully!`);
                return res.json({
                  msg: "User successfully registered!",
                  details: user_details,
                });
              });
            }
          );
        });
      }
    );
  } catch (error) {
    console.log(err);
    return res
      .status(200)
      .json({ flag: 2, msg: "An error occured while logging in!" });
  }
};

// Student Registration By admin
module.exports.studentRegistration = (req, res) => {
  const userObj = {
    user_first_name: req.body.user_first_name,
    user_last_name: req.body.user_last_name,
    user_email: req.body.user_email,
    user_hash: md5(req.body.password),
    user_college_id: req.body.user_college_id,
    user_inst_id: req.body.user_inst_id,
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
      "SELECT user_email FROM user_detail WHERE user_email = ?",
      [userObj.user_email],
      async (err, results) => {
        if (err) {
          console.log("Error Occured!");
          return res.status(200).json({ flag: 2, msg: err });
        }

        if (results.length > 0) {
          return res
            .status(200)
            .json({ flag: 2, msg: "Email is already Registered!" });
        }

        // Verify whether the institute exists
        db.query("INSERT INTO user_detail SET ?", userObj, (err, results) => {
          if (err) {
            console.log(err);
            return res
              .status(200)
              .json({ flag: 2, msg: "Internal Server error" });
          }

          // If Results show the id
          db.query(
            "SELECT * FROM user_detail WHERE user_id = ?",
            results.insertId,
            (err, rows) => {
              if (err) {
                console.log(err);
                res.json(err);
              }

              // Loggin the user created
              const user_details = rows[0];
              // console.log("User", rows[0], "created successfully");

              const cartObj = { user_id: results.insertId, total_amt: 0 };
              db.query("INSERT INTO user_carts SET ?", cartObj, (err, row) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ msg: "Internal Server error" });
                }

                console.log(`Cart Id: ${row.insertId} created successfully!`);
                return res.json({
                  msg: "User successfully registered!",
                  details: user_details,
                });
              });
            }
          );
        });
      }
    );
  } catch (error) {
    console.log(err);
    return res
      .status(200)
      .json({ flag: 2, msg: "An error occured while logging in!" });
  }
};

// Student Login
module.exports.studentLogin = (req, res) => {
  try {
    const { user_email, password } = req.body;

    if (!user_email || !password) {
      return res
        .status(400)
        .json({ flag: 2, msg: "Please Fill all the required Fields!" });
    }

    // Check if the entered user email exists
    db.query(
      "SELECT * FROM user_detail WHERE user_email = ?",
      [user_email],
      (err, rows) => {
        if (err) {
          console.log(err);
          return res.status(200).json({ flag: 2, msg: "An error occured!" });
        }

        if (rows.length == 0 || md5(password) != rows[0].user_hash) {
          console.log("Invalid Email or Password!");
          return res
            .status(200)
            .json({ flag: 2, msg: "Invalid Email or Password" });
        }

        // After Successful Login, Now Generate a Token

        const token = jwt.sign(
          { id: rows[0].user_id, role: "user" },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        );

        console.log("Login Token Generated");
        // res.cookie("jwt", token, {
        //   maxAge: 1000 * 60 * 60,
        //   httpOnly: true,
        // });
        return res.status(200).json({ flag: 1, token, details: rows[0] });
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ flag: 2, msg: "An error occured while logging in!" });
  }
};
