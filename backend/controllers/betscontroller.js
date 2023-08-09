const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");

const BetRequest = async (req, res) => {
  try {
    const { user1, user2, gameid } = req.body;

    //records in bets table, RETURNS THE BET ID
    const placedbetID = await pool.query(queries.PlaceBet, [
      gameid,
      user1,
      user2,
    ]);
    //gets bet ID from SQL query return
    betid = placedbetID.rows[0].betid;

    //uses the returned betid to add to this table
    const betdetails = await pool.query(queries.RecordBetDetails, [
      betid,
      123,
      123,
    ]);
    res.send("sec");
  } catch (err) {
    console.error(err.message);
    res.send("Error on SQL query");
  }
};

module.exports = {
  BetRequest,
};
