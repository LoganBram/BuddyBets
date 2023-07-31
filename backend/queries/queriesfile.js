const getAllTest = "SELECT * FROM test";
const addGames =
  " INSERT INTO games (gameid, startdate, homeid, awayid, time ) VALUES ($1, $2, $3, $4, $5 )";
const updateDayScores =
  "UPDATE games SET homescore = $1, awayscore = $2 WHERE gameid = $3";
const getGameidForDay =
  "SELECT gameid FROM games WHERE startdate::text LIKE $1";

//JWT QUERIES
const CheckIfUserExists = "SELECT * FROM users WHERE email = $1";

const InsertUser =
  "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *";

module.exports = {
  getAllTest,
  addGames,
  updateDayScores,
  getGameidForDay,
  CheckIfUserExists,
  InsertUser,
};
