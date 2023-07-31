const { Router } = require("express");
const authrouter = Router();
const usercontroller = require("../controllers/usercontroller.js");
const validInfo = require("../middleware/validinfo.js");
const authorize = require("../middleware/authorization.js");

// -> auth/
authrouter.post("/register", validInfo, usercontroller.RegisterUser);

authrouter.post("/login", validInfo, usercontroller.LoginUser);

authrouter.get("/is-verify", authorize, usercontroller.Verified);

module.exports = authrouter;
