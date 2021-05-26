const jwt = require("jsonwebtoken");

exports.verifyInstitute = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      console.log("No token was set!");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(`${req.user.id} is logged In`);
    next();
  } catch (err) {
    console.log(err);
    return res.json({ msg: "Auth Failed!" });
  }
};
