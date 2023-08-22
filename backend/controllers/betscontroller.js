const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");

const BetRequest = async (req, res) => {
  try {
    const { user2, wager, gameid, user1odds, user2odds, user1_onhome } =
      req.body;
    const user1 = req.user;
    console.log(user1_onhome);
    //records in bets table, RETURNS THE BET ID
    const placedbetID = await pool.query(queries.PlaceBet, [
      gameid,
      user1,
      user2,
    ]);
    //gets bet ID from SQL query return
    betid = placedbetID.rows[0].betid;

    if (user1_onhome === true) {
      //uses the returned betid to add to this table
      await pool.query(queries.RecordBetDetails, [
        betid,
        user1odds,
        user2odds,
        wager,
        user1,
        user2,
      ]);

      res.send({ message: "Bet Placed Successfully" });
    } else {
      await pool.query(queries.RecordBetDetails, [
        betid,
        user1odds,
        user2odds,
        wager,
        user2,
        user1,
      ]);
    }
  } catch (err) {
    console.error(err.message);
    res.send("Error on SQL query");
  }
};

const DetermineWinners = async (req, res) => {
  await pool.query(queries.DetermineWinner);
};
module.exports = {
  BetRequest,
  DetermineWinners,
};
