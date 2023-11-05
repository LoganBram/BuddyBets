const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");

const BetRequest = async (req, res) => {
  try {
    const { user2, wager, gameid, user1odds, user2odds, user1_onhome } =
      req.body;
    const user1 = req.user;
    console.log(
      user2,
      wager,
      gameid,
      user1odds,
      user2odds,
      user1_onhome,
      user1
    );
    //check if user have enough credits
    const usercredits = await pool.query(queries.GetUserCredits, [user1]);
    if (Number(usercredits.rows[0].credits) < Number(wager)) {
      return res.send("Insufficient Credits");
    }

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
  console.log("det");
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
  //Joins tables and fills in winner ID in SQL where applicable
  const betstofinish = await pool.query(queries.DetermineWinner);

  await betstofinish.rows.forEach(async (bet) => {
    await pool.query(queries.FinishBet, [bet.betid]);
  });

  //distribute credits
  for (const bet of betstofinish.rows) {
    //distribute to user1 if winner
    console.log(bet);
    if (bet.winnerid === bet.user1) {
      let winnings = calculateWinnings(bet.wager, bet.user1odds);
      winnings = parseFloat(winnings);

      await pool.query(queries.DistributeCredits, [winnings, bet.user1]);
    } //distribute to user 2 if winner
    else if (bet.winnerid === bet.user2) {
      let winnings = calculateWinnings(bet.wager, bet.user2odds);
      winnings = parseFloat(winnings);

      await pool.query(queries.DistributeCredits, [winnings, bet.user2]);
    }
  }
};

const GetPendingBetsReceived = async (req, res) => {
  console.log(req.user);
  try {
    const receivedbets = await pool.query(queries.GetPendingBetsReceived, [
      req.user,
    ]);
    console.log(receivedbets.rows);
    res.send(receivedbets.rows);
  } catch (error) {
    res.send(error);
  }
};

const GetPendingBetsSent = async (req, res) => {
  try {
    const sentbets = await pool.query(queries.GetPendingBetsSent, [req.user]);
    res.send(sentbets.rows);
  } catch (error) {
    res.send(error);
  }
};

const AcceptBet = async (req, res) => {
  try {
    const usercredits = await pool.query(queries.GetUserCredits, [req.user]);
    console.log(usercredits.rows[0].credits);
    if (Number(usercredits.rows[0].credits) < Number(req.body.wager)) {
      return res.status(400).send("Insufficient Credits");
    }

    await pool.query(queries.AcceptBet, [req.body.betid]);
    await pool.query(queries.DeductCreditsFromAcceptedBet, [
      req.body.wager,
      req.body.user1,
      req.body.user2,
    ]);
    res.send({ message: "Bet Accepted Succuessfully" });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const DenyBet = async (req, res) => {
  try {
    await pool.query(queries.DenyBet, [req.body.betid]);

    res.send({ message: "Bet Denied" });
  } catch (error) {
    res.send(error.message);
  }
};

const GetOngoingBets = async (req, res) => {
  try {
    const ongoingbets = await pool.query(queries.GetOngoingBets, [req.user]);
    res.send(ongoingbets.rows);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  BetRequest,
  DetermineWinners,
  GetPendingBetsReceived,
  GetPendingBetsSent,
  AcceptBet,
  DenyBet,
  GetOngoingBets,
};
