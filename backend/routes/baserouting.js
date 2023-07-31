const { Router } = require("express");
const router = Router();
const controller = require("../controllers/basecontroller.js");
const usercontroller = require("../controllers/usercontroller.js");
const validInfo = require("../middleware/validinfo.js");

router.get("/getgames", controller.getGamesController);

router.get("/getscores", controller.getScoresController);

router.post("/sendbetrequest", usercontroller.BetReq);

// -> auth/
router.post("/register", validInfo, usercontroller.RegisterUser);

router.post("/login", validInfo, usercontroller.LoginUser);

module.exports = router;
