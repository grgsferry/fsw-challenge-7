const matchRepository = require("../../repositories/match.repository");
const roomRepository = require("../../repositories/room.repository");

module.exports = {
  getMatches: async (req, res) => {
    try {
      if (!req.body.roomname) {
        const payload = Number(req.user.id);
        const matches = await matchRepository.getAllByUserID(payload);
        res.json(matches);
      } else {
        const room = await roomRepository.getOneByName(req.body.roomname);
        const payload = {
          userid: Number(req.user.id),
          roomid: room.id,
        };
        const match = await matchRepository.getOneByUserIDRoomID(payload);
        res.json(match);
      }
    } catch (err) {
      res.json(err);
    }
  },
  postMatch: async (req, res) => {
    try {
      if (!req.body.user_suit_1 || !req.body.user_suit_2 || !req.body.user_suit_3) {
        throw new Error("You are not choosing 3 suits");
      }
      const room = await roomRepository.getOneByName(req.body.roomname);
      const payload = {
        roomid: room.id,
        userid: req.user.id,
        user_suit_1: req.body.user_suit_1,
        user_suit_2: req.body.user_suit_2,
        user_suit_3: req.body.user_suit_3,
        user_result: "Pending",
      };
      await matchRepository.postMatchData(payload);
      res.json(payload);
    } catch (error) {
      res.json(error);
    }
  },
};
