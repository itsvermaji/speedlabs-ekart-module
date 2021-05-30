const db = require("../../config/dbConnection");

exports.dashboard = (req, res) => {
  // console.log(`Dashboard user is ${req.user.id}`);

  try {
    if (!req.user) {
      return res.json({
        msg: `Good Afternoon Guest, Welcome to the Dashboard`,
        name: "Guest",
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      });
    } else {
      db.query(
        "SELECT name FROM institute_details WHERE id = ?",
        req.user.id,
        (err, results) => {
          return res.json({
            msg: `Good Afternoon ${results[0].name}, Welcome to your Dashboard`,
            name: results[0].name,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
          });
        }
      );
    }
  } catch (err) {
    return res.json({ msg: "An error occured, while fetching data" });
  }
};
exports.postDashboard = (req, res) => {
  res.json({ msg: "This is POST institute Dashboard." });
};
