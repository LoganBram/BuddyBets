const { Router } = require("express");
const router = Router();
const controller = require("../controllers/basecontroller.js");
const usercontroller = require("../controllers/usercontroller.js");

router.get("/getgames", controller.getGamesController);

router.get("/getscores", controller.getScoresController);

router.post("/sendbetrequest", usercontroller.BetReq);

module.exports = router;
