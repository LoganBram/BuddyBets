const { Router } = require("express");
const router = Router();
const controller = require("../controllers/betscontroller.js");
const authorize = require("../middleware/authorization.js");

// -> /bets route

router.post("/placebet", authorize, controller.BetRequest);

module.exports = router;
