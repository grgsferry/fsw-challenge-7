const roomRepository = require("../../repositories/room.repository");
const matchRepository = require("../../repositories/match.repository");

module.exports = {
  getRoom: async (req, res) => {
    try {
      const uuid = req.params.id;
      const gameid = req.params.gameid;
      const room = await roomRepository.getOneByUuid(uuid);
      const matchesInRoom = await matchRepository.getAllByRoomID(room.id);
      if (matchesInRoom.length >= 2) {
        throw new Error("Room has already been played!");
      }
      req.session.message = room;
      res.render(`room-${gameid}`, { room });
    } catch (error) {
      res.json(error.message);
    }
  },
  postRoom: async (req, res) => {
    try {
      if (req.body.length < 3) {
        throw new Error("You are not choosing 3 suits");
      }
      const payload = {
        roomid: req.session.message.id,
        userid: req.user.id,
        user_suit_1: req.body.suit_1,
        user_suit_2: req.body.suit_2,
        user_suit_3: req.body.suit_3,
        user_result: "Pending",
      };
      await matchRepository.postMatchData(payload);
      req.session.message = "";
      res.redirect("/web/history");
    } catch (error) {
      res.json(error);
    }
  },
};
