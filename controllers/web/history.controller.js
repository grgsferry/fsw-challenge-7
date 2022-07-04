const matchRepository = require("../../repositories/match.repository");

module.exports = {
  getHistory: async (req, res) => {
    try {
      const payload = Number(req.user.id);
      const matches = await matchRepository.getAllByUserID(payload);
      res.render("history", { matches });
      // res.json(matches);
    } catch (err) {
      res.json(err);
    }
  },
};
