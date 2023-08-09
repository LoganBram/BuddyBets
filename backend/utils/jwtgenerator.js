const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(userid) {
  const payload = {
    user: userid,
  };
  return jwt.sign(payload, process.env.JWTSECRET, { expiresIn: "2hr" });
}

module.exports = jwtGenerator;
