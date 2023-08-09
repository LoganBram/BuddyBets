const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");

const BetRequest = async (req, res) => {
  try {
    const { user1, user2, amount, gameid } = req.body;

    const placebet = await pool.query(queries.PlaceBet, [123, 123, 123, 123]);
    res.send("Success");
  } catch (err) {
    res.send("error on SQL query");
  }
};

module.exports = {
  BetRequest,
};
