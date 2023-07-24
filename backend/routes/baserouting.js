const { Router } = require("express");
const router = Router();
const controller = require("../controllers/basecontroller.js");

router.get("/getgames", controller.getGames);

module.exports = router;
