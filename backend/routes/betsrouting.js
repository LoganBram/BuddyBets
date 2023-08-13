const { Router } = require("express");
const router = Router();
const controller = require("../controllers/betscontroller.js");
const authorize = require("../middleware/authorization.js");

router.post("/placebet", controller.BetRequest);

module.exports = router;
