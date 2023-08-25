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
  //Joins tables and fills in winner ID in SQL where applicable
  const x = await pool.query(queries.DetermineWinner);

  const calculateWinnings = (wager, odds) => {
    if (odds > 0) {
      const winnings = ((wager * odds) / 100).toFixed(2);
      const x = (parseFloat(winnings) + wager).toFixed(2);
      return x;
    } else if (odds < 0) {
      const winnings = ((wager * 100) / Math.abs(odds)).toFixed(2);
      const x = (parseFloat(winnings) + wager).toFixed(2);
      return x;
    } else {
      return 0; // No profit or loss with even odds (odds = 0)
    }
  };

  //distribute credits
  for (const bet of x.rows) {
    //distribute to user1 if winner
    if (bet.winnerid === bet.user1) {
      const winnings = calculateWinnings(bet.wager, bet.user1odds);
      winnings = parseInt(winnings);
      await pool.query(queries.DistributeCredits, [winnings, bet.user1]);
    } //distribute to user 2 if winner
    else if (bet.winnerid === bet.user2) {
      let winnings = calculateWinnings(bet.wager, bet.user2odds);
      winnings = parseInt(winnings);
      await pool.query(queries.DistributeCredits, [winnings, bet.user2]);
    }
  }
};
module.exports = {
  BetRequest,
  DetermineWinners,
};
