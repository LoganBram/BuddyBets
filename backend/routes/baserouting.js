const { Router } = require("express");
const router = Router();
const controller = require("../controllers/databasecontroller.js");

// -> /route

router.get("/updategames-database", controller.getGamesController);

router.get("/updategamestoday-database", controller.getGamesForDay);

router.get("/updatescores-database", controller.getScoresController);

module.exports = router;
