const router = require("express").Router();
const userApiController = require("../../controllers/api/user.controller");
const gameApiController = require("../../controllers/api/game.controller");
const matchApiController = require("../../controllers/api/match.controller");
const roomApiController = require("../../controllers/api/room.controller");

router.get("/user", userApiController.getUser);
router.put("/user", userApiController.postEditUser);
router.delete("/user", userApiController.deleteUser);

router.get("/game", gameApiController.getGames);

router.get("/room", roomApiController.getRoom);
router.post("/room", roomApiController.postRoom);

router.get("/match", matchApiController.getMatches);
router.post("/match", matchApiController.postMatch);

module.exports = router;
