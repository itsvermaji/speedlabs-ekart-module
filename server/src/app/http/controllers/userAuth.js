const db = require("../../config/dbConnection");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

// Student Controllers
module.exports.register = (req, res) => {
  res.json({ msg: "Get: Institute registration page" });
};

module.exports.postRegister = (req, res) => {
  const { user_first_name, user_email, password, user_inst_id, user_location } =
    req.body;

  db.query(
    "SELECT user_email FROM user_details WHERE user_email = ?",
    [user_email],
    async (err, results) => {
      if (err) {
        console.log("Error Occured!");
        return res.json({ msg: err });
      }

      if (results.length > 0) {
        return res.json({ msg: "Email is already Registered!" });
      }

      const userObj = {
        user_first_name,
        user_email,
        user_hash: md5(password),
        user_inst_id,
        user_location,
      };

      // Verify whether the institute exists
      db.query(
        "SELECT * FROM institute_details WHERE id = ?",
        user_inst_id,
        async (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ msg: "Internal Server error" });
          } else if (results.length == 0) {
            console.log("Invalid institute id is entered!");
            return res.status(400).json({ msg: "Bad request!" });
          } else {
            db.query(
              "INSERT INTO user_details SET ?",
              userObj,
              (err, results) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ msg: "Internal Server error" });
                }

                // If Results show the id
                db.query(
                  "SELECT * FROM user_details WHERE user_id = ?",
                  results.insertId,
                  (err, rows) => {
                    if (err) {
                      console.log(err);
                      res.json(err);
                    }

                    // Loggin the user created
                    console.log("User", rows[0], "created successfully");

                    const cartObj = { user_id: results.insertId, total_amt: 0 };
                    db.query(
                      "INSERT INTO user_carts SET ?",
                      cartObj,
                      (err, row) => {
                        if (err) {
                          console.log(err);
                          return res
                            .status(500)
                            .json({ msg: "Internal Server error" });
                        }

                        console.log(
                          `Cart Id: ${row.insertId} created successfully!`
                        );
                        return res.json({
                          msg: "User successfully registered!",
                        });
                      }
                    );
                  }
                );
              }
            );
          }
        }
      );
    }
  );

  // res.json({ msg: "Post: Institute registration page" });
};

// Login Route for Institute

module.exports.login = (req, res) => {
  res.json({ msg: "Post: Institute login page" });
};

module.exports.postLogin = (req, res) => {
  try {
    const { user_email, password } = req.body;

    if (!user_email || !password) {
      return res
        .status(400)
        .json({ msg: "Please Fill all the required Fields!" });
    }

    // Check if the entered user email exists
    db.query(
      "SELECT * FROM user_details WHERE user_email = ?",
      [user_email],
      (err, rows) => {
        if (err) {
          console.log(err);
          return res.json({ msg: "An error occured!" });
        }

        if (rows.length == 0 || md5(password) != rows[0].user_hash) {
          console.log("Invalid Email or Password!");
          return res.status(401).json({ msg: "Invalid Email or Password" });
        }

        // After Successful Login, Now Generate a Token

        const token = jwt.sign(
          { id: rows[0].user_id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        );

        console.log("Login Token Generated");

        req.body.token = token;

        console.log(token);
        return res.json(token);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "An error occured while logging in!" });
  }
};
