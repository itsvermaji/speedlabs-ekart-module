const db = require("../../config/dbConnection");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

// Institute Controllers
module.exports.register = (req, res) => {
  res.json({ msg: "Get: Institute registration page" });
};

module.exports.postRegister = (req, res) => {
  const { name, city, email, password } = req.body;

  db.query(
    "SELECT email FROM institute_details WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.log("Error Occured!");
        return res.json({ msg: err });
      }

      if (results.length > 0) {
        return res.json({ msg: "Email is already Registered!" });
      }

      console.log(name, city, email, institute_hash);
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
            return res.json(err);
          }

          // If Results show the id
          db.query(
            "SELECT * FROM institute_details WHERE id = ?",
            [`${results.insertId}`],
            (err, data) => {
              if (err) {
                res.json(err);
              }

              // Institute Data is displayed after successfull registration.
              return res.json(data);
            }
          );

          // return res.json("User is inserted at id: " + results.insertId);
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please Fill all the required Fields!" });
    }

    db.query(
      "SELECT * FROM institute_details WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res.json(err);
        }

        if (results.length < 1 || md5(password) != results[0].institute_hash) {
          console.log("Invalid Email or Password!");
          return res.status(401).json({ msg: "Invalid Email or Password" });
        }

        // After Successful Login, Now Generate a Token

        const token = await jwt.sign(
          { id: results[0].id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        );

        console.log("Login Token Generated");
        req.body.token = token;
        return res.json(token);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "An error occured while logging in!" });
  }
};
