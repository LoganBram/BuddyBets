/* uses functions defined in modules to get the data, this file takes the data and stores it in the database
using queries from the queries folder*/

const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
const { GamesForNext7DaysCall } = require("../modules/datacaching.js");
const { GetScoresCall } = require("../modules/datacaching.js");
const { getTodayDate } = require("../utils/dates.js");
const {
  getStoredGameid_BasedOnDate,
} = require("../modules/fetchingstoredata.js");
const { getFutureDate } = require("../utils/dates.js");
const axios = require("axios");
const redis = require("redis");

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

//Runs upon initialization then uses getgamesforday,
//which runs once a day for the games 7 days in advance
const getGamesController = async (req, res) => {
  try {
    //returns array of objects containing games for next 7 days
    const games = await GamesForNext7DaysCall();
    //stores games into DB
    games.map((game) => {
      //converts date from api call from 2023-08-29T23:00:00+00:00 to 2023-08-24
      game.date = game.date.split("T")[0];
      pool.query(queries.addGames, [
        game.id,
        game.date,
        game.homeid,
        game.awayid,
        game.time,
        game.hometeam,
        game.awayteam,
        game.leagueid,
      ]);
    });
    res.send("games for the week updated in db");
  } catch (error) {
    console.error("Error fetching games:", error.message);
    res.status(500).send("Error fetching games");
  }
};

//this runs once a day, exactly at 00:10 to update cache and database
const getGamesForDay = async (req, res) => {
  try {
    const date = await getFutureDate(6);

    const options = {
      method: "GET",
      url: `https://api-basketball.p.rapidapi.com/games?date=${date}`,
      headers: {
        "x-rapidapi-host": "api-basketball.p.rapidapi.com",
        "x-rapidapi-key": process.env.APIKEY,
      },
    };
    const response = await axios(options);
    const dayofgames = response.data.response;

    //add each game within the day to the database
    const AddNewGamesPromise = dayofgames.map(async (game) => {
      game.date = game.date.split("T")[0];
      if (game.league.id === 13 || game.league.id === 12) {
        await pool.query(queries.addGames, [
          game.id,
          game.date,
          game.teams.home.id,
          game.teams.away.id,
          game.time,
          game.teams.home.name,
          game.teams.away.name,
          game.league.id,
        ]);
      }
    });

    Promise.all([AddNewGamesPromise]).then(async (results) => {
      //get games from db and store in redis
      gamesfornext7 = await pool.query(queries.GetGamesForNext7Days);

      await client.connect();
      //set games for the next 7 days in the redis cache
      await client.set("games", JSON.stringify(gamesfornext7.rows));
      await client.quit();
    });

    res.send("all games on the day 7 days from now added to db");
  } catch (error) {
    console.error("Error fetching games:", error.message);
    res.status(500).send("Error fetching games for the 7th day");
  }
};

//updates scores for todays games
const getScoresController = async () => {
  try {
    const date = await getTodayDate();

    //Gets gameids of games that happened today

    const games = await pool.query(queries.getGameidForDay, [date]);
    const gameids = games.rows;
    console.log(gameids);
    if (gameids === null) {
      console.log("no games today");
    }
    //convert to array
    const gameIdsArray = gameids.map((game) => game.gameid);

    //gets all games from today
    const call = await axios({
      method: "GET",
      url: `https://api-basketball.p.rapidapi.com/games?date=${date}`,
      headers: {
        "x-rapidapi-host": "api-basketball.p.rapidapi.com",
        "x-rapidapi-key": process.env.APIKEY,
      },
    });

    //filter response to only include specified games
    const response_unfiltered = call.data.response;

    const response = response_unfiltered.filter((game) =>
      gameIdsArray.includes(game.id)
    );
    console.log(response);

    // Response contains an array of game objects for the specified day
    response.map(async (game) => {
      //updates scores and status based on gameid for each game

      await pool.query(queries.updateDayScores, [
        game.scores.home.total,
        game.scores.away.total,
        game.status.long,
        game.id,
      ]);
    });
    console.log("ScoresUpdated.");
    return gameIdsArray;
  } catch (error) {
    console.error("Error updating scores:", error.message);
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
