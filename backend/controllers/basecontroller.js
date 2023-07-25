const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
const { GamesForNext7DaysCall } = require("../modules/datafetch.js");
const { GetScoresCall } = require("../modules/datafetch.js");

//updates games for next 7 days
const getGamesController = async (req, res) => {
  try {
    //returns array of objects containing games for next 7 days
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

const getScoresController = async (req, res) => {
  const date = "2023-07-23";
  const gameids = [341677, 341676, 341680];
  const response = await GetScoresCall(date, gameids);
  //response contains array of game objects for the specified day
  response.map((game) => {
    pool.query(queries.updateDayScores, [
      game.scores.home.total,
      game.scores.away.total,
      game.id,
    ]);
    console.log(game.id);
    console.log(game.scores.home.total);
    console.log(game.scores.away.total);
  });
};

module.exports = {
  getGamesController,
  getScoresController,
};
