const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");

//send bet request
const BetReq = async (req, res) => {
  res.json({ requestBody: req.body.color });
};

//accept bet request

//deny bet request

module.exports = {
  BetReq,
};
