const roomRepository = require("../../../repositories/room.repository");

module.exports = {
  getRoom: async (req, res) => {
    try {
      const rooms = await roomRepository.adminGet();
      res.json(rooms);
    } catch (error) {
      res.json(error.message);
    }
  },
  putRoom: async (req, res) => {
    try {
      const room = await roomRepository.getOneByID(req.body.id);
      const payload = {
        id: req.body.id,
        name: req.body.name || room.name,
        gameid: req.body.gameid || room.gameid,
      };
      const updatedRoom = await roomRepository.adminPut(payload);
      res.json({ message: "Successfully updated room data." });
    } catch (error) {
      res.json(error.message);
    }
  },
  deleteRoom: async (req, res) => {
    try {
      const payload = { id: req.body.id };
      await roomRepository.adminDelete(payload);
      res.json({ message: "Successfully deleted room." });
    } catch (error) {
      res.json(error.message);
    }
  },
};
