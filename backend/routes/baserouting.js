const { Router } = require("express");
const router = Router();
const controller = require("../controllers/basecontroller.js");
const usercontroller = require("../controllers/usercontroller.js");

router.get("/getgames", controller.getGamesController);

router.get("/getscores", controller.getScoresController);

router.post("/sendbetrequest", usercontroller.BetReq);

// -> auth/
router.post("/register", usercontroller.RegisterUser);

router.post("/login", usercontroller.LoginUser);

module.exports = router;
