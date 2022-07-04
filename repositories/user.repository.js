const { User, RoleDetail } = require("../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

module.exports = {
  encryptPassword: function (password) {
    return bcrypt.hashSync(password);
  },

  checkPassword: function (password, encryptedPassword) {
    return bcrypt.compareSync(password, encryptedPassword);
  },

  login: async function (payload) {
    const user = await this.getOneByUsername(payload.username);
    if (!user) {
      throw new Error("User or password invalid");
    }
    const checkPassword = this.checkPassword(payload.password, user.password);
    if (!checkPassword) {
      throw new Error("User or password invalid");
    }
    return user;
  },

  getOneByUsername: function (username) {
    return User.findOne({
      where: {
        [Op.and]: [
          { username },
          {
            deletedAt: {
              [Op.is]: null,
            },
          },
        ],
      },
    });
  },

  getAll: function () {
    return User.findAll({
      where: {
        deletedAt: {
          [Op.is]: null,
        },
      },
    });
  },

  register: function ({ username, email, password }) {
    const encryptedPassword = this.encryptPassword(password);
    return User.create({ username, email, password: encryptedPassword });
  },

  add: function (payload) {
    return this.register(payload);
  },

  updateUser: async function (username, payload) {
    const user = await this.getOneByUsername(username);
    await user.set(payload);
    await user.save();
  },

  deleteUser: function (username) {
    return User.destroy({
      where: {
        username,
      },
    });
  },

  adminGet: function (payload) {
    if (!payload) {
      return User.findAll({
        include: [
          {
            model: RoleDetail,
            as: "roles",
          },
        ],
      });
    } else {
      return User.findOne({
        where: {
          [Op.and]: [
            {
              "$User.id$": {
                [Op.eq]: payload,
              },
            },
            {
              "$User.deletedAt$": {
                [Op.is]: null,
              },
            },
          ],
        },
        include: [
          {
            model: RoleDetail,
            as: "roles",
          },
        ],
      });
    }
  },

  adminPut: async function (payload) {
    const user = await User.findOne({ where: { id: payload.userid } });
    await user.set(payload);
    await user.save();
  },
};
