const jwt = require("jsonwebtoken");
const usercontroller = require("../controllers/usercontroller.js");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    //assigns jwtTOKEN to the request header labeled token
    const jwtToken = req.header("token");
    //if there is no token then throw error
    if (!jwtToken) {
      return res.status(403).json("Please Login");
    }

    //if there is a token it checks if its still valid and the secret is correct
    try {
      //get username of user and verify them
      jwt.verify(jwtToken, process.env.JWTSECRET);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(403).json({
          errmsg: "too long since last login, please login again",
          reason: "expired",
        });
      } else {
        return res
          .status(403)
          .json({ errmsg: "Please login ", reason: "token_not_found" });
      }
    }

    //checks using env SECRET and token extracted, to verify the user
    const verify = jwt.verify(jwtToken, process.env.JWTSECRET);
    //if token valid, extracts user property to req.user

    req.user = verify.user;

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Server error in authorize");
  }
};
