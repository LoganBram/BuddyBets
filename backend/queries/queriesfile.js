const getAllTest = "SELECT * FROM test";
const addGames =
  " INSERT INTO games (gameid, startdate, homeid, awayid, time, hometeam, awayteam ) VALUES ($1, $2, $3, $4, $5, $6, $7 )";
const updateDayScores =
  "UPDATE games SET homescore = $1, awayscore = $2 WHERE gameid = $3";
const getGameidForDay =
  "SELECT gameid FROM games WHERE startdate::text LIKE $1";

//JWT QUERIES
const CheckIfUserExists = "SELECT * FROM users WHERE email = $1";

const CheckIfUsernameExists = "SELECT * FROM users WHERE username = $1";

const InsertUser =
  "INSERT INTO users (name, email, password, username) VALUES ($1, $2, $3, $4) RETURNING *";

const GetUUIDFromusername = "SELECT * FROM users WHERE username = $1 ";

//FRIENDS QUERIES
const SendFriendRequest =
  "INSERT INTO friends (user_id, friend_id) VALUES ($1, $2)";

const CheckIfDuplicateRequest =
  "SELECT * FROM friends WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1)";

//BET QUERIES

const PlaceBet =
  "INSERT INTO bets (gameid, user1, user2) VALUES ($1, $2, $3) RETURNING betid";

const RecordBetDetails =
  "INSERT INTO betdetails (betid, user1odds, user2odds, wager) VALUES ($1, $2, $3, $4)";

//ACCESSING DATABASE FOR EXTERNAL API DATA
const GetGamesinDB = "SELECT * FROM games";

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
};
