const userRepository = require("../../../repositories/user.repository");
const roleRepository = require("../../../repositories/role.repository");

module.exports = {
  getUser: async (req, res) => {
    try {
      const users = await userRepository.adminGet();
      res.json(users);
    } catch (error) {
      res.json(error.message);
    }
  },
  postUser: async (req, res) => {
    try {
      const payloadUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      const inputUser = await userRepository.add(payloadUser);
      const payloadRole = {
        user_id: inputUser.id,
        role_id: req.body.roleid,
      };
      await roleRepository.adminPost(payloadRole);

      const user = await userRepository.adminGet(inputUser.id);
      res.json(user);
    } catch (error) {
      res.json(error.message);
    }
  },
  putUser: async (req, res) => {
    try {
      let user = await userRepository.adminGet(Number(req.body.userid));
      let encryptedPassword;
      if (req.body.password) {
        encryptedPassword = userRepository.encryptPassword(req.body.password);
      }
      const payloadUser = {
        userid: req.body.userid,
        username: req.body.username || user.username,
        email: req.body.email || user.email,
        password: encryptedPassword || user.password,
      };
      await userRepository.adminPut(payloadUser);

      //   if (req.body.role_id_prev && req.body.role_id_new) {
      //     const payloadRole = {
      //       user_id: user.id,
      //       role_id_prev: req.body.role_id_prev,
      //       role_id_new: req.body.role_id_new,
      //     };
      //     await roleRepository.adminPut(payloadRole);
      //   }

      user = await userRepository.adminGet(Number(req.body.userid));
      res.json(user);
    } catch (error) {
      res.json(error.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await userRepository.adminGet(Number(req.body.userid));
      await userRepository.deleteUser(user.username);
      res.json({ message: "Successfully deleted." });
    } catch (error) {
      res.json(error.message);
    }
  },
};
