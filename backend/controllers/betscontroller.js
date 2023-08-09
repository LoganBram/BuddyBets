const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");

const BetRequest = async (req, res) => {
  try {
    const { user1, user2, gameid } = req.body;

    //records in bets table, RETURNS THE BET ID
    const placebetID = await pool.query(queries.PlaceBet, [
      gameid,
      user1,
      user2,
    ]);
    //uses the returned betid to add to this table
    const betdetails = await pool.query(queries.RecordBetDetails, []);

    res.send(placebetID.rows[0].betid);
  } catch (err) {
    console.error(err.message);
    res.send("Error on SQL query");
  }
};

module.exports = {
  BetRequest,
};
