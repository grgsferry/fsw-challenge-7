const router = require("express").Router();
const userApiAdmController = require("../../controllers/api/admin/user.controller");
const gameApiAdmController = require("../../controllers/api/admin/game.controller");
const roomApiAdmController = require("../../controllers/api/admin/room.controller");
const matchApiAdmController = require("../../controllers/api/admin/match.controller");

router.get("/user", userApiAdmController.getUser);
router.post("/user", userApiAdmController.postUser);
router.put("/user", userApiAdmController.putUser);
router.delete("/user", userApiAdmController.deleteUser);

router.get("/game", gameApiAdmController.getGame);
router.post("/game", gameApiAdmController.postGame);
router.put("/game", gameApiAdmController.putGame);
router.delete("/game", gameApiAdmController.deleteGame);

router.get("/room", roomApiAdmController.getRoom);
router.put("/room", roomApiAdmController.putRoom);
router.delete("/room", roomApiAdmController.deleteRoom);

router.get("/match", matchApiAdmController.getMatch);
router.delete("/match", matchApiAdmController.deleteMatch);

module.exports = router;
