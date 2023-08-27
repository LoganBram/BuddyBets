const getAllTest = "SELECT * FROM test";
const addGames =
  " INSERT INTO games (gameid, startdate, homeid, awayid, time, hometeam, awayteam ) VALUES ($1, $2, $3, $4, $5, $6, $7 )";
const updateDayScores =
  "UPDATE games SET homescore = $1, awayscore = $2, status = $3  WHERE gameid = $4";
const getGameidForDay =
  "SELECT gameid FROM games WHERE startdate::text LIKE $1";

//JWT QUERIES
const CheckIfUserExists = "SELECT * FROM users WHERE email = $1";

const CheckIfUsernameExists = "SELECT * FROM users WHERE username = $1";

const InsertUser =
  "INSERT INTO users (name, email, password, username) VALUES ($1, $2, $3, $4) RETURNING *";

const GetUUIDFromusername = "SELECT * FROM users WHERE username = $1 ";

const GetUsernamefromUUID = "SELECT * FROM users WHERE user_id = $1 ";

//FRIENDS QUERIES
const SendFriendRequest =
  "INSERT INTO friends (user_id, friend_id) VALUES ($1, $2)";

const CheckIfDuplicateRequest =
  "SELECT * FROM friends WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1)";

const GetAllFriends =
  "SELECT * FROM friends WHERE user_id = $1 OR friend_id = $1";

//BET QUERIES

const PlaceBet =
  "INSERT INTO bets (gameid, user1, user2) VALUES ($1, $2, $3) RETURNING betid";

const RecordBetDetails =
  "INSERT INTO betdetails (betid, user1odds, user2odds, wager, homebettor, awaybettor) VALUES ($1, $2, $3, $4, $5, $6)";

const DetermineWinner = `
UPDATE betdetails
SET winnerid = CASE
  WHEN games.homescore > games.awayscore AND betdetails.homebettor = bets.user1 THEN bets.user1
  WHEN games.homescore > games.awayscore AND betdetails.homebettor = bets.user2 THEN bets.user2
  WHEN games.homescore < games.awayscore AND betdetails.awaybettor = bets.user1 THEN bets.user1
  WHEN games.homescore < games.awayscore AND betdetails.awaybettor = bets.user2 THEN bets.user2
  ELSE NULL
END
FROM games
JOIN bets ON games.gameid = bets.gameid
WHERE games.status = 'Game Finished' AND betdetails.winnerid IS NULL AND bets.status = 'accepted'
  AND betdetails.betid = bets.betid 
RETURNING betdetails.user1odds, betdetails.user2odds, betdetails.winnerid, betdetails.wager, betdetails.betid, bets.user1, bets.user2;

  `;

const FinishBet = `UPDATE bets SET status = 'finished' WHERE betid = $1`;

const DistributeCredits =
  "UPDATE users SET credits = credits + $1 WHERE user_id = $2";

const GetPendingBetsReceived = `
  SELECT
      bd.*,
      b.gameid,
      b.user1,
      u1.username AS user1_username,
      b.user2,
      u2.username AS user2_username,
      g.*
  FROM
      betdetails bd
  JOIN
      bets b ON bd.betid = b.betid
  JOIN
      games g ON b.gameid = g.gameid
  JOIN
      users u1 ON b.user1 = u1.user_id
  JOIN
      users u2 ON b.user2 = u2.user_id
  WHERE
      b.user2 = $1 AND b.status = 'sent';
`;

const GetPendingBetsSent = `
  SELECT
      bd.*,
      b.gameid,
      b.user1,
      u1.username AS user1_username,
      b.user2,
      u2.username AS user2_username,
      g.*
  FROM
      betdetails bd
  JOIN
      bets b ON bd.betid = b.betid
  JOIN
      games g ON b.gameid = g.gameid
  JOIN
      users u1 ON b.user1 = u1.user_id
  JOIN
      users u2 ON b.user2 = u2.user_id
  WHERE
      b.user1 = $1 AND b.status = 'sent';
`;

const AcceptBet = "UPDATE bets SET status = 'accepted' WHERE betid = $1";
const DenyBet = "UPDATE bets SET status = 'denied' WHERE betid = $1";

const GetOngoingBets = `
SELECT
    bd.*,
    b.gameid,
    b.user1,
    u1.username AS user1_username,
    b.user2,
    u2.username AS user2_username,
    g.*
FROM
    betdetails bd
JOIN
    bets b ON bd.betid = b.betid
JOIN
    games g ON b.gameid = g.gameid
JOIN
    users u1 ON b.user1 = u1.user_id
JOIN
    users u2 ON b.user2 = u2.user_id
WHERE
    (b.user1 = $1 OR b.user2 = $1) AND b.status = 'accepted';
`;

//ACCESSING DATABASE FOR EXTERNAL API DATA
const GetGamesinDB = "SELECT * FROM games ORDER BY startdate ASC";

module.exports = {
  getAllTest,
  addGames,
  updateDayScores,
  getGameidForDay,
  CheckIfUserExists,
  InsertUser,
  PlaceBet,
  RecordBetDetails,
  GetGamesinDB,
  SendFriendRequest,
  CheckIfUsernameExists,
  GetUUIDFromusername,
  CheckIfDuplicateRequest,
  GetAllFriends,
  GetUsernamefromUUID,
  DetermineWinner,
  DistributeCredits,
  GetPendingBetsReceived,
  GetPendingBetsSent,
  AcceptBet,
  DenyBet,
  GetOngoingBets,
  FinishBet,
};
