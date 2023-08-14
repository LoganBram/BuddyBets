const { Router } = require("express");
const router = Router();
const controller = require("../controllers/apidata-indb.js");

// -> /apidata-inDB route

router.get("/GetGamesinDB", controller.GetGamesinDB);

module.exports = router;
