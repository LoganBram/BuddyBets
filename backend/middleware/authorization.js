const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    //assigns jwtTOKEN to the request header labeled token
    const jwtToken = req.header("token");
    //if there is no token then throw error
    if (!jwtToken) {
      throw error;
    }

    //checks using env SECRET and token extracted, to verify the user
    const verify = jwt.verify(jwtToken, process.env.JWTSECRET);
    //if token valid, extracts user property to req.user
    req.user = verify.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorized");
  }
};
