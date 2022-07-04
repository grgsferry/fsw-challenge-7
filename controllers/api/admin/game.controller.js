const gameRepository = require("../../../repositories/game.repository");

module.exports = {
  getGame: async (req, res) => {
    try {
      const games = await gameRepository.getAll();
      res.json(games);
    } catch (error) {
      res.json(error.message);
    }
  },
  postGame: async (req, res) => {
    try {
      const payload = {
        name: req.body.name,
        description: req.body.description,
      };
      const game = await gameRepository.postGame(payload);
      res.json(game);
    } catch (error) {
      res.json(error.message);
    }
  },
  putGame: async (req, res) => {
    try {
      const game = await gameRepository.getOneByID(req.body.id);
      const payload = {
        id: req.body.id,
        name: req.body.name || game.name,
        description: req.body.description || game.description,
      };
      const updatedGame = await gameRepository.putGame(payload);
      res.json(updatedGame);
    } catch (error) {
      res.json(error.message);
    }
  },
  deleteGame: async (req, res) => {
    try {
      const payload = { id: req.body.id };
      await gameRepository.deleteGame(payload);
      res.json({ message: "Successfully deleted." });
    } catch (error) {
      res.json(error.message);
    }
  },
};
