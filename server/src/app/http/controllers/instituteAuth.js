const db = require("../../config/dbConnection");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

// Institute Controllers
module.exports.register = (req, res) => {
  res.status(200).json({ msg: "Get: Institute registration page" });
};

module.exports.postRegister = (req, res) => {
  const { name, city, email, password } = req.body;

  db.query(
    "SELECT email FROM institute_details WHERE email = ?",
    [email],
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

      db.query(
        "INSERT INTO institute_details SET ?",
        {
          name: name,
          city: city,
          email: email,
          institute_hash: md5(password),
        },
        (err, results) => {
          if (err) {
            console.log(err);
            return res.status(200).json({ flag: 2, err });
          }

          // If Results show the id
          db.query(
            "SELECT * FROM institute_details WHERE id = ?",
            [`${results.insertId}`],
            (err, data) => {
              if (err) {
                res.status(200).json({ flag: 2, err });
              }

              // Institute Data is displayed after successfull registration.
              console.log("Institute Registration: ", data);
              return res.json({
                flag: 1,
                msg: "Institute Registration Successfull!",
              });
            }
          );

          // return res.json("User is inserted at id: " + results.insertId);
        }
      );
    }
  );

  // res.json({ flag: 2, msg: "Post: Institute registration page" });
};

// Login Route for Institute

module.exports.login = (req, res) => {
  res.json({ flag: 2, msg: "Post: Institute login page" });
};

module.exports.postLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(200)
        .json({ flag: 2, msg: "Please Fill all the required Fields!" });
    }

    db.query(
      "SELECT * FROM institute_details WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res.status(200).json({ flag: 2, err });
        }

        if (results.length < 1 || md5(password) != results[0].institute_hash) {
          console.log("Invalid Email or Password!");
          return res
            .status(200)
            .json({ flag: 2, msg: "Invalid Email or Password" });
        }

        // After Successful Login, Now Generate a Token

        const token = await jwt.sign(
          { id: results[0].id, role: "admin" },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        );

        console.log("Admin login Token Generated");
        // res.cookie("jwt", token, {
        //   maxAge: 1000 * 60 * 60,
        //   httpOnly: true,
        // });
        return res.status(200).json({ flag: 1, token, details: results[0] });
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ flag: 2, msg: "An error occured while logging in!" });
  }
};
