const axios = require("axios");
const pool = require("../db");
const { next7days } = require("../utils/dates");
require("dotenv").config();

class GameObject {
  constructor(id, date, time, homeid, awayid, hometeam, awayteam, leagueid) {
    this.id = id;
    this.homeid = homeid;
    this.awayid = awayid;
    this.time = time;
    this.date = date;
    this.hometeam = hometeam;
    this.awayteam = awayteam;
    this.leagueid = leagueid;
  }
}

//calls the next 7 days, then obtains all the games for the next 7 days and stores in database

const GamesForNext7DaysCall = async () => {
  try {
    //gets the next 7 days
    const thisweek = await next7days();

    //calls the api to get the games for each day in the week
    //api only allows calling the games for individual days but not for a range of days

    //since we need multiple leagues, I have opted to call the entire set of games rather than
    //league based as done in gamesforday call, to reduce api calls
    const apiCalls = thisweek.map((date) => {
      const options = {
        method: "GET",
        url: `https://api-basketball.p.rapidapi.com/games?date=${date}`,
        headers: {
          "x-rapidapi-host": "api-basketball.p.rapidapi.com",
          "x-rapidapi-key": process.env.APIKEY,
        },
      };
      return axios(options);
    });

    //handles all the promises from the api call

    const respfortheweek = await Promise.all(apiCalls);

    //once all promises are fulfilled,  we obtain the game dates
    //this process is to keep the dates in order

    const gamesfortheweek = respfortheweek.map((resp) => resp.data.response);
    console.log(gamesfortheweek);
    const filteredgames = FilteringGamesForNext7DaysCall(
      gamesfortheweek,
      thisweek
    );

    return filteredgames;
  } catch (error) {
    console.error("Error fetching games:", error.message);
  }
};

/*helper function that takes in api call of all games for next 7 days
then filters it for nba games and stores it in database*/

const FilteringGamesForNext7DaysCall = (gamesfortheweek, thisweek) => {
  //array to store filtered data for each game
  const gameObjectsArr = [];

  let daytracker = 0;

  //for loop into 0-6 indexed array, with each index containing game objects for the day
  for (const day of gamesfortheweek) {
    for (const game of day) {
      if (game.league.id === 13 || game.league.id === 12) {
        const { id, time, date } = game;
        const homeid = game.teams.home.id;
        const awayid = game.teams.away.id;
        const hometeam = game.teams.home.name;
        const awayteam = game.teams.away.name;
        const leagueid = game.league.id;
        //creates a new game object with the filtered data
        const gameObject = new GameObject(
          id,
          date,
          time,
          homeid,
          awayid,
          hometeam,
          awayteam,
          leagueid
        );

        //pushes the game object to the gameObjects array
        gameObjectsArr.push(gameObject);
        //increment to next day
        daytracker++;
      }
    }
  }
  return gameObjectsArr;
};

module.exports = {
  GamesForNext7DaysCall,
};
