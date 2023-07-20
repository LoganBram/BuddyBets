const { Router } = require("express");
const router = Router();
const controller = require("../controllers/controllerfile.js");

router.get("/", controller.getGames);

module.exports = router;
