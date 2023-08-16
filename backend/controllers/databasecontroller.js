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
const { getFutureDate } = require("../utils/dates.js");
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
//this runs in 10 minutes after each day starts to update the games
const getGamesForDay = async (req, res) => {
  try {
    const date = await getFutureDate(7);
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
    const dayofgames = response.data.response;
    //add each game within the day to the database
    dayofgames.map(async (game) => {
      await pool.query(queries.addGames, [
        game.id,
        game.date,
        game.teams.home.id,
        game.teams.away.id,
        game.time,
        game.teams.home.name,
        game.teams.away.name,
      ]);
    });
    res.send("all games on the day 7 days from now added to db");
  } catch (error) {
    console.error("Error fetching games:", error.message);
    res.status(500).send("Error fetching games for the 7th day");
  }
};

//updates scores for todays games
const getScoresController = async (req, res) => {
  const date = await getTodayDate();

  //uses yesterdays date to get all gameids matching that date, returned as
  //array of objs
  const gameids = await getStoredGameid_BasedOnDate(date);

  if (gameids === null) {
    res.send("no games today");
  }
  //convert to array
  const gameIdsArray = gameids.map((game) => game.gameid);

  try {
    //gets scores for given date and specified gameids
    const response = await GetScoresCall(date, gameIdsArray);

    // Response contains an array of game objects for the specified day
    response.map(async (game) => {
      //updates scores based on gameid for each game

      await pool.query(queries.updateDayScores, [
        game.scores.home.total,
        game.scores.away.total,
        game.id,
      ]);
    });
    res.send("yes");
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
