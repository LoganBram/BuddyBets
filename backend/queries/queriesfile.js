const getAllTest = "SELECT * FROM test";
const addGames =
  " INSERT INTO games (gameid, startdate, homeid, awayid) VALUES ($1, $2, $3, $4)";

module.exports = {
  getAllTest,
};
