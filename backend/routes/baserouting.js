const { Router } = require("express");
const router = Router();
const controller = require("../controllers/basecontroller.js");

router.get("/getgames", controller.getGamesController);

router.get("/getscores", controller.getScoresController);

module.exports = router;
