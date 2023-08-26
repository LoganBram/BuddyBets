const { Router } = require("express");
const router = Router();
const controller = require("../controllers/betscontroller.js");
const authorize = require("../middleware/authorization.js");

// -> /bets route

router.post("/placebet", authorize, controller.BetRequest);

router.get(
  "/getpendingbetsreceived",
  authorize,
  controller.GetPendingBetsReceived
);

router.get("/getpendingbetssent", authorize, controller.GetPendingBetsSent);

router.post("/acceptbet", controller.AcceptBet);
module.exports = router;
