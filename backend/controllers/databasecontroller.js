/* uses functions defined in modules to get the data, this file takes the data and stores it in the database
using queries from the queries folder*/

const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
const { GamesForNext7DaysCall } = require("../modules/datafetch.js");
const { GetScoresCall } = require("../modules/datafetch.js");
const { getTodayDate } = require("../utils/dates.js");
const {
  getStoredGameid_BasedOnDate,
} = require("../modules/fetchingstoredata.js");
const axios = require("axios");

//updates games for next 7 days
const getGamesController = async (req, res) => {
  try {
    //returns array of objects containing games for next 7 days
    const games = await GamesForNext7DaysCall();
    //stores games into DB
    games.map((game) => {
      pool.query(queries.addGames, [
        game.id,
        game.date,
        game.homeid,
        game.awayid,
        game.time,
        game.hometeam,
        game.awayteam,
      ]);
    });
    console.log(games);
  } catch (error) {
    console.error("Error fetching games:", error.message);
    res.status(500).send("Error fetching games");
  }
};

const getGamesForDay = async (req, res) => {
  const date = await getTodayDate();
  const currentYear = new Date().getUTCFullYear();

  const options = {
    method: "GET",
    url: `https://api-basketball.p.rapidapi.com/games?date=${date}&season=${currentYear}&league=13`,
    headers: {
      "x-rapidapi-host": "api-basketball.p.rapidapi.com",
      "x-rapidapi-key": process.env.APIKEY,
    },
  };
  const response = await axios(options);
  res.send(response.data);
};

//updates scores for todays games
const getScoresController = async (req, res) => {
  const date = await getTodayDate();
  //uses yesterdays date to get all gameids matching that date, returned as
  //array of objs
  const gameids = await getStoredGameid_BasedOnDate(date);
  //convert to array
  const gameIdsArray = gameids.map((game) => game.gameid);
  try {
    //gets scores for given date and specified gameids
    const response = await GetScoresCall(date, gameIdsArray);
    // Response contains an array of game objects for the specified day
    for (const game of response) {
      //updates scores based on gameid for each game
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

const test = async (req, res) => {
  await pool.query("INSERT INTO test (testing) VALUES ('hi')");
};

module.exports = {
  getGamesController,
  getScoresController,
  test,
  getGamesForDay,
};
