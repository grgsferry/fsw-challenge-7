const { User, Role } = require("../models");

module.exports = {
  assignRoleNewUser: function (payload) {
    return this.assignRole(payload);
  },

  assignRole: async function ({ username }) {
    const user = await User.findOne({ where: { username } });
    return Role.create({ user_id: user.id, role_id: 2 });
  },

  adminPost: function (payload) {
    return Role.create({ user_id: payload.user_id, role_id: payload.role_id });
  },

  // adminPut: async function (payload) {
  //   const input = {
  //     user_id: payload.user_id,
  //     role_id: Number(payload.role_id_new),
  //   };

  //   let role = await Role.findOne({
  //     where: {
  //       user_id: payload.user_id,
  //       role_id: payload.role_id_prev,
  //     },
  //   });

  // role.role_id = input.role_id;
  // await role.update({ input }, { silent: true });
  // await role.save();
  //},
};
