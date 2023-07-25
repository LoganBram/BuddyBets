const axios = require("axios");
const pool = require("../db");
const { next7days } = require("./dates");
require("dotenv").config();

class GameObject {
  constructor(id, date, time, homeid, awayid) {
    this.id = id;
    this.homeid = homeid;
    this.awayid = awayid;
    this.time = time;
    this.date = date;
  }
}

//gets scores for game on certain day and updates table

GetScoresCall = async (date, gameids) => {
  try {
    const call = await axios({
      method: "GET",
      url: `https://api-basketball.p.rapidapi.com/games?date=${date}&timezone=canada/vancouver`,
      headers: {
        "x-rapidapi-host": "api-basketball.p.rapidapi.com",
        "x-rapidapi-key": process.env.APIKEY,
      },
    });

    //filter response to only include specified games
    const response = call.data.response;
    const filteredResponse = response.filter((game) =>
      gameids.includes(game.id)
    );

    return filteredResponse;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    throw error;
  }
};

const GamesForNext7DaysCall = async () => {
  try {
    //gets the next 7 days
    const thisweek = await next7days();

    //calls the api to get the games for each day in the week
    //api only allows calling the games for individual days but not for a range of days
    //this is required otherwise the display on front page would only be one day at a time

    const apiCalls = thisweek.map((date) => {
      const options = {
        method: "GET",
        url: `https://api-basketball.p.rapidapi.com/games?date=${date}&timezone=canada/vancouver`,
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

    const filteredgames = FilteringGamesForNext7DaysCall(
      gamesfortheweek,
      thisweek
    );

    return filteredgames;
  } catch (error) {
    console.error("Error fetching games:", error.message);
  }
};

const FilteringGamesForNext7DaysCall = (gamesfortheweek, thisweek) => {
  //array to store filtered data for each game
  const gameObjectsArr = [];
  //date from api is in wrong format, so using my own date array
  let daytracker = 0;

  //for loop into 6 indexed array, with each index containing game objects for the day
  for (const day of gamesfortheweek) {
    for (const game of day) {
      console.log(game);
      if (game.league.id === 13) {
        const { id, time, date } = game;
        const homeid = game.teams.home.id;
        const awayid = game.teams.away.id;
        //creates a new game object with the filtered data
        const gameObject = new GameObject(id, date, time, homeid, awayid);

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
  GetScoresCall,
};
