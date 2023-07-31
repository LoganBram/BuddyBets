const authrouter = Router();
const usercontroller = require("../controllers/usercontroller.js");
const validInfo = require("../middleware/validinfo.js");
const authorize = require("../middleware/authorization.js");

// -> auth/
router.post("/register", validInfo, usercontroller.RegisterUser);

router.post("/login", validInfo, usercontroller.LoginUser);

router.get("/is-verify", authorize, usercontroller.Verified);

module.exports = authrouter;
