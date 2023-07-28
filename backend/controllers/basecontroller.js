/* uses functions defined in modules to get the data, this file takes the data and stores it in the database
using queries from the queries folder*/

const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
const { GamesForNext7DaysCall } = require("../modules/datafetch.js");
const { GetScoresCall } = require("../modules/datafetch.js");
const { getYesterdayDate } = require("../modules/dates.js");
const {
  getStoredGameid_BasedOnDate,
} = require("../modules/fetchingstoredata.js");

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
  const date = await getYesterdayDate();
  //uses yesterdays date to get all gameids matching that date
  const gameids = await getStoredGameid_BasedOnDate(date);
  console.log(gameids);
  try {
    const gameIdsArray = gameids.map((game) => game.gameid);
    const response = await GetScoresCall(date, gameIdsArray);
    // Response contains an array of game objects for the specified day
    for (const game of response) {
      console.log(game);
      //updates scores based on gameid
      await pool.query(queries.updateDayScores, [
        game.scores.home.total,
        game.scores.away.total,
        game.id,
      ]);
    }
  } catch (error) {
    console.error("Error updating scores:", error.message);
    res.status(500).send("Error updating scores");
  }
};

module.exports = {
  getGamesController,
  getScoresController,
};
