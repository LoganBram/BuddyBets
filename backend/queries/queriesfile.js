const getAllTest = "SELECT * FROM test";
const addGames =
  " INSERT INTO games (gameid, homeid, awayid, time, startdate) VALUES ($1, $2, $3, $4, $5)";

module.exports = {
  getAllTest,
  addGames,
};
