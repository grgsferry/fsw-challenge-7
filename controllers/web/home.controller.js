const userRepository = require("../../repositories/user.repository");

module.exports = {
  getHome: (req, res) => {
    const user = {
      uuid: req.user.uuid,
      username: req.user.username,
      email: req.user.email,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
      roles: req.user.roles,
    };
    res.render("home", { user });
  },
  getEditUser: async (req, res) => {
    try {
      res.render("edituser");
    } catch (error) {
      res.json(error);
    }
  },
  postEditUser: async (req, res) => {
    try {
      let encryptedPassword;
      if (req.body.password) {
        encryptedPassword = userRepository.encryptPassword(req.body.password);
      }
      const payload = {
        username: req.body.username || req.user.username,
        email: req.body.email || req.user.email,
        password: encryptedPassword || req.user.password,
      };
      await userRepository.updateUser(req.user.username, payload);
      res.redirect("/web/home");
    } catch (error) {
      res.json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const username = req.user.username;
      await userRepository.deleteUser(username);
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    } catch (error) {
      res.json(error.message);
    }
  },
  logOut: (req, res) => {
    try {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    } catch (error) {
      res.json(error.message);
    }
  },
};
