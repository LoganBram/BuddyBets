const { Router } = require("express");
const router = Router();
const controller = require("../controllers/basecontroller.js");

router.get("/getgames", controller.getGames);

router.get("/getscores", controller.getScores);

module.exports = router;
