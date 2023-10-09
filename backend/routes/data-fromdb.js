const { Router } = require("express");
const router = Router();
const controller = require("../controllers/apidata-indb.js");

// -> /database route

router.get("/GetWeekGames", controller.GetGamesForWeekCache);

module.exports = router;
