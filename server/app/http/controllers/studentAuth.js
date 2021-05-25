exports.register = (req, res) => {
  res.json({ msg: "Get: Student registration page" });
};
exports.postRegister = (req, res) => {
  res.json({ msg: "Post: Student registration page" });
};
exports.login = (req, res) => {
  res.json({ msg: "Get: Student login page" });
};
exports.postLogin = (req, res) => {
  res.json({ msg: "Post: Student login page" });
};
