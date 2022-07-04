const gameRepository = require("../../repositories/game.repository");

module.exports = {
  getGames: async (req, res) => {
    try {
      const games = await gameRepository.getAll();
      res.render("games", { games });
    } catch (err) {
      res.json(err);
    }
  },
};
