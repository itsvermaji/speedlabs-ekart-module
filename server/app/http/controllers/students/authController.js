function studentAuth() {
  return {
    register(req, res) {
      res.json({ msg: "Get: Student registration page" });
    },
    postRegister(req, res) {
      res.json({ msg: "Post: Student registration page" });
    },

    login(req, res) {
      res.json({ msg: "Get: Student login page" });
    },
    postLogin(req, res) {
      res.json({ msg: "Post: Student login page" });
    },
  };
}

module.exports = studentAuth;
