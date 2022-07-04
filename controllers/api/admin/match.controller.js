const matchRepository = require("../../../repositories/match.repository");

module.exports = {
  getMatch: async (req, res) => {
    try {
      const matches = await matchRepository.adminGet();
      res.json(matches);
    } catch (error) {
      res.json(error.message);
    }
  },
  deleteMatch: async (req, res) => {
    try {
      const payload = { id: req.body.id };
      await matchRepository.adminDelete(payload);
      res.json({ message: "Successfully deleted match." });
    } catch (error) {
      res.json(error.message);
    }
  },
};
