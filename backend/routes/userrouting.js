const { Router } = require("express");
const userrouter = Router();
const usercontroller = require("../controllers/usercontroller.js");
const validInfo = require("../middleware/validinfo.js");
const authorize = require("../middleware/authorization.js");

// -> auth/
userrouter.post("/register", validInfo, usercontroller.RegisterUser);

userrouter.post("/login", validInfo, usercontroller.LoginUser);

userrouter.get("/is-verify", authorize, usercontroller.Verified);

userrouter.get("/dashboard", authorize, usercontroller.Dashboard);

userrouter.post(
  "/newfriendrequest",
  authorize,
  usercontroller.NewFriendRequest
);

userrouter.get("/getfriends", authorize, usercontroller.GetUserFriends);

userrouter.get("/getuserid", authorize, usercontroller.GetUserId);
module.exports = userrouter;
