function instituteAuth() {
  return {
    register(req, res) {
      res.json({ msg: "Get: Institute registration page" });
    },
    postRegister(req, res) {
      res.json({ msg: "Post: Institute registration page" });
    },

    login(req, res) {
      res.json({ msg: "Get: Institute login page" });
    },
    postLogin(req, res) {
      res.json({ msg: "Post: Institute login page" });
    },
  };
}

module.exports = instituteAuth;
