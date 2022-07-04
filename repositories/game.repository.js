const { Game } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getAll: function () {
    return Game.findAll({
      where: {
        deletedAt: {
          [Op.is]: null,
        },
      },
    });
  },

  getOneByName: function (name) {
    return Game.findOne({ where: { name } });
  },

  getOneByID: function (id) {
    return Game.findOne({ where: { id } });
  },

  postGame: function (payload) {
    return Game.create(payload);
  },

  putGame: async function (payload) {
    const game = await this.getOneByID(payload.id);
    const input = {
      name: payload.name,
      description: payload.description,
    };
    game.set(input);
    return game.save();
  },

  deleteGame: function (payload) {
    return Game.destroy({ where: { id: payload.id } });
  },
};
