const getAllTest = "SELECT * FROM test";
const addGames =
  " INSERT INTO games (gameid, startdate, homeid, awayid, time, ) VALUES ($1, $2, $3, $4, $5)";

module.exports = {
  getAllTest,
  addGames,
};
