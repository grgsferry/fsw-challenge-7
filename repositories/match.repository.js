const { Match, Room, Game } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getAllByUserID: function (payload) {
    return Match.findAll({
      where: {
        [Op.and]: [
          {
            "$Match.userid$": {
              [Op.eq]: payload,
            },
          },
          {
            "$Match.deletedAt$": {
              [Op.is]: null,
            },
          },
        ],
      },
      include: [
        {
          model: Room,
          as: "room",
          include: [
            {
              model: Game,
              as: "game",
            },
          ],
        },
      ],
    });
  },

  getAllByRoomID: function (payload) {
    return Match.findAll({
      where: {
        [Op.and]: [
          {
            roomid: {
              [Op.eq]: payload,
            },
          },
          {
            deletedAt: {
              [Op.is]: null,
            },
          },
        ],
      },
    });
  },

  getOneByUserIDRoomID: function (payload) {
    return Match.findAll({
      where: {
        [Op.and]: [
          {
            "$Match.userid$": {
              [Op.eq]: payload.userid,
            },
          },
          {
            "$Match.roomid$": {
              [Op.eq]: payload.roomid,
            },
          },
          {
            "$Match.deletedAt$": {
              [Op.is]: null,
            },
          },
        ],
      },
      include: [
        {
          model: Room,
          as: "room",
          include: [
            {
              model: Game,
              as: "game",
            },
          ],
        },
      ],
    });
  },

  getOpponentData: function (payload) {
    return Match.findOne({
      where: {
        [Op.and]: [
          {
            roomid: {
              [Op.eq]: payload.roomid,
            },
          },
          {
            userid: {
              [Op.ne]: payload.userid,
            },
          },
          {
            deletedAt: {
              [Op.is]: null,
            },
          },
        ],
      },
    });
  },

  getSuitCalculation: function (suitPlayer, suitOpponent) {
    if (suitPlayer === suitOpponent) {
      return 0;
    } else if (suitPlayer === "rock" && suitOpponent === "scissors") {
      return 1;
    } else if (suitPlayer === "paper" && suitOpponent === "rock") {
      return 1;
    } else if (suitPlayer === "scissors" && suitOpponent === "paper") {
      return 1;
    } else {
      return -1;
    }
  },

  getMatchCalculation: function (player, opponent) {
    const arrPlayer = [player.user_suit_1, player.user_suit_2, player.user_suit_3];
    const arrOpponent = [opponent.user_suit_1, opponent.user_suit_2, opponent.user_suit_3];
    const matchResult = [];
    for (let i = 0; i < 3; i++) {
      let suitResult = this.getSuitCalculation(arrPlayer[i], arrOpponent[i]);
      matchResult.push(suitResult);
    }
    return matchResult[0] + matchResult[1] + matchResult[2];
  },

  postMatchData: async function (payload) {
    const recordedMatches = await this.getAllByRoomID(payload.roomid);
    if (recordedMatches.length === 2) {
      return new Error({ message: "Room has already been played!" });
    } else if (recordedMatches.length === 1) {
      if (recordedMatches[0].userid === payload.userid) {
        return new Error({ message: "Can not input data twice!" });
      } else {
        const opponent = await this.getOpponentData(payload);
        const gameResult = this.getMatchCalculation(payload, opponent);
        if (gameResult > 0) {
          payload.user_result = "Win";
          opponent.user_result = "Lose";
          await opponent.save();
        } else if (gameResult < 0) {
          payload.user_result = "Lose";
          opponent.user_result = "Win";
          await opponent.save();
        } else {
          payload.user_result = "Draw";
          opponent.user_result = "Draw";
          await opponent.save();
        }
        return Match.create(payload);
      }
    } else {
      return Match.create(payload);
    }
  },

  adminGet: () => {
    return Match.findAll();
  },

  adminDelete: (payload) => {
    const id = payload.id;
    return Match.destroy({ where: { id } });
  },
};
