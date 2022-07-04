const matchRepository = require("../../repositories/match.repository");
const roomRepository = require("../../repositories/room.repository");

module.exports = {
  getRoom: async (req, res) => {
    try {
      const room = await roomRepository.getOneByName(req.body.name);
      res.json(room);
    } catch (error) {
      res.json(error.message);
    }
  },
  postRoom: async (req, res) => {
    try {
      const payload = {
        name: req.body.name,
        gameid: req.body.gameid,
      };
      await roomRepository.createNewRoom(payload);
      res.json({ message: "Successfully create room." });
    } catch (error) {
      res.json(error);
    }
  },
};
