const jwt = require("jsonwebtoken");

exports.verifyInstitute = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      console.log("User is not Authorized!");
      return res.status(400).json({ msg: "User not authorized!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(`${req.user.id} user verified`);

    next();
  } catch (err) {
    console.log(err);
    return res.json({ msg: "Auth Failed!" });
  }
};
