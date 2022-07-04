const router = require("express").Router();
const homeWebController = require("../../controllers/web/home.controller");
const gameWebController = require("../../controllers/web/game.controller");
const historyWebController = require("../../controllers/web/history.controller");
const playWebController = require("../../controllers/web/play.controller");
const roomWebController = require("../../controllers/web/room.controller");

router.get("/home", homeWebController.getHome);
router.get("/home/edit-user", homeWebController.getEditUser);
router.post("/home/edit-user", homeWebController.postEditUser);
router.post("/home/delete-user", homeWebController.deleteUser);

router.get("/games", gameWebController.getGames);

router.get("/history", historyWebController.getHistory);

router.get("/play", playWebController.getPlay);

router.get("/play/create", playWebController.getPlayCreate);
router.post("/play/create", playWebController.postPlayCreate);

router.get("/play/find", playWebController.getPlayFind);
router.post("/play/find", playWebController.postPlayFind);

router.get("/room/:gameid/:id", roomWebController.getRoom);
router.post("/room/:gameid/:id", roomWebController.postRoom);

router.post("/logout", homeWebController.logOut);

module.exports = router;
