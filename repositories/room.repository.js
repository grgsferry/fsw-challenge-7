const { Room } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  createNewRoom: function (payload) {
    return Room.create(payload);
  },

  getOneByName: function (name) {
    return Room.findOne({
      where: {
        [Op.and]: [
          { name },
          {
            deletedAt: {
              [Op.is]: null,
            },
          },
        ],
      },
    });
  },

  getOneByID: function (id) {
    return Room.findOne({
      where: {
        [Op.and]: [
          { id },
          {
            deletedAt: {
              [Op.is]: null,
            },
          },
        ],
      },
    });
  },

  getOneByUuid: function (uuid) {
    return Room.findOne({
      where: {
        [Op.and]: [
          { uuid },
          {
            deletedAt: {
              [Op.is]: null,
            },
          },
        ],
      },
    });
  },

  adminGet: function () {
    return Room.findAll();
  },

  adminPut: async function (payload) {
    const room = await this.getOneByID(payload.id);
    const input = {
      name: payload.name,
      gameid: payload.gameid,
    };
    await room.set(input);
    await room.save();
  },

  adminDelete: async function (payload) {
    return Room.destroy({
      where: { id: payload.id },
    });
  },
};
