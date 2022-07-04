const userRepository = require("../../repositories/user.repository");
const roleRepository = require("../../repositories/role.repository");
const jwt = require("jsonwebtoken");

module.exports = {
  postRegister: async (req, res) => {
    try {
      const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      await userRepository.add(payload);
      await roleRepository.assignRoleNewUser(payload);
      res.json({ message: "Successfully Registered" });
    } catch (err) {
      res.json(err);
    }
  },
  postLogin: async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
      const user = await userRepository.login({ username, password });
      const token = jwt.sign(
        {
          sub: user.id.toString(),
          iss: "gameroom.com",
          aud: "playeruser",
        },
        "JWT secret token",
        { expiresIn: "24h" }
      );
      res.json({ username: user.username, token, message: "Don't share this to anybody!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
