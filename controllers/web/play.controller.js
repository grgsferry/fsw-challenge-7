const roomRepository = require("../../repositories/room.repository");
const gameRepository = require("../../repositories/game.repository");

module.exports = {
  getPlay: async (req, res) => {
    try {
      res.render("play");
    } catch (err) {
      res.json(err);
    }
  },
  getPlayCreate: async (req, res) => {
    try {
      const games = await gameRepository.getAll();
      res.render("play-create", { games });
    } catch (err) {
      res.json(err);
    }
  },
  postPlayCreate: async (req, res) => {
    try {
      const game = await gameRepository.getOneByName(req.body.game);
      const payload = {
        name: req.body.name,
        gameid: game.id,
      };
      await roomRepository.createNewRoom(payload);
      res.redirect("/web/play/find");
    } catch (error) {
      res.json(error);
    }
  },
  getPlayFind: async (req, res) => {
    try {
      res.render("play-find");
    } catch (err) {
      res.json(err);
    }
  },
  postPlayFind: async (req, res) => {
    try {
      const name = req.body.name;
      req.session.message = req.body.name;
      const foundRoom = await roomRepository.getOneByName(name);
      res.redirect(`/web/room/${foundRoom.gameid}/${foundRoom.uuid}`);
    } catch (error) {
      res.json(error);
    }
  },
};
