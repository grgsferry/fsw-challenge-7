const router = require("express").Router();
const guestApiController = require("../../controllers/api/guest.controller");

router.post("/register", guestApiController.postRegister);
router.post("/login", guestApiController.postLogin);

module.exports = router;
