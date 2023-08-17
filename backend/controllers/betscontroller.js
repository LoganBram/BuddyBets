const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");

const BetRequest = async (req, res) => {
  try {
    const { user2, wager, gameid, user1odds, user2odds } = req.body;
    const user1 = req.user;
    console.log({ user1, user2 });
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
      user1odds,
      user2odds,
      wager,
    ]);

    res.send({ message: "Bet Placed Successfully" });
  } catch (err) {
    console.error(err.message);
    res.send("Error on SQL query");
  }
};

const DetermineWinners = async (req, res) => {
  //1. find all games where status = finished and get gameid
  //2. go to bets table and find all bets where the game id matchs, return the bet id
  //3. go to betdetails table and find all bets where the bet id matches and set winnerid in the betdetails table
  //and update winnerid based on who won in the games table

  await pool.query(queries.DetermineWinner);
};
module.exports = {
  BetRequest,
  DetermineWinners,
};
