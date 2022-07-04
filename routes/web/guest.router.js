const router = require("express").Router();
const guestWebController = require("../../controllers/web/guest.controller");
const userMiddleware = require("../../middlewares/web/user.middleware");

router.all("/register", userMiddleware.guestOnly);
router.all("/login", userMiddleware.guestOnly);

router.get("/register", guestWebController.getRegister);
router.post("/register", guestWebController.postRegister);

router.get("/login", guestWebController.getLogin);
router.post("/login", guestWebController.postLogin);

module.exports = router;
