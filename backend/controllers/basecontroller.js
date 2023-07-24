const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
const { GamesForNext7DaysCall } = require("../modules/datafetch.js");
const { GetScoresCall } = require("../modules/datafetch.js");

//updates games for next 7 days
const getGames = async (req, res) => {
  try {
    const games = await GamesForNext7DaysCall();
    games.map((game) => {
      pool.query(queries.addGames, [
        game.id,
        game.date,
        game.homeid,
        game.awayid,
        game.time,
      ]);
    });
    res.send(games);
  } catch (error) {
    console.error("Error fetching games:", error.message);
    res.status(500).send("Error fetching games");
  }
};

const getScores = async (req, res) => {
  const date = "2023-07-23";
  const gameids = [341677, 341676, 341680];
  const response = await GetScoresCall(date, gameids);
  res.send(response);
};

module.exports = {
  getGames,
  getScores,
};
