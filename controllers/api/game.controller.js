const gameRepository = require("../../repositories/game.repository");

module.exports = {
  getGames: async (req, res) => {
    try {
      if (!req.body.name) {
        const games = await gameRepository.getAll();
        res.json(games);
      } else {
        const game = await gameRepository.getOneByName(req.body.name);
        res.json(game);
      }
    } catch (err) {
      res.json(err);
    }
  },
};
