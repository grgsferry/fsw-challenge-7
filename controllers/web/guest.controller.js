const userRepository = require("../../repositories/user.repository");
const roleRepository = require("../../repositories/role.repository");
const passport = require("../../lib/passport");

module.exports = {
  getRegister: (req, res) => {
    res.render("register");
  },
  getLogin: (req, res) => {
    res.render("login");
  },
  postRegister: async (req, res) => {
    try {
      const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      await userRepository.add(payload);
      await roleRepository.assignRoleNewUser(payload);
      res.redirect("/login");
    } catch (err) {
      res.json(err);
    }
  },
  postLogin: passport.authenticate("local", {
    successRedirect: "/web/home",
    failureRedirect: "/login",
    failureFlash: true,
  }),
};
