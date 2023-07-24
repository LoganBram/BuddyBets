const axios = require("axios");
const pool = require("../db");
const { next7days } = require("./dates");

class GameObject {
  constructor(id, date, time, homeid, awayid) {
    this.id = id;
    this.homeid = homeid;
    this.awayid = awayid;
    this.time = time;
    this.date = date;
  }
}

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
          "x-rapidapi-key":
            "17c1c2bc80msh0edbcbc5e8d8cbap178151jsnb0abea9d94a3",
        },
      };
      return axios(options);
    });

    //handles all the promises from the api call

    const respfortheweek = await Promise.all(apiCalls);

    //once all promises are fulfilled,  we obtain the game dates
    //this process is to keep the dates in order

    const gamesfortheweek = respfortheweek.map((resp) => resp.data.response);

    const filteredgames = FilteringGamesForNext7DaysCall(gamesfortheweek);
  } catch (error) {
    console.error("Error fetching games:", error.message);
  }
};

const FilteringGamesForNext7DaysCall = (gamesfortheweek) => {
  //array to store filtered data for each game
  const gameObjectsArr = [];

  //for loop into 6 indexed array, with each index containing game objects for the day
  for (const day of gamesfortheweek) {
    for (const game of day) {
      console.log(game);
      if (game.league.id === 13) {
        const { id, date, time } = game;
        const { homeid, awayid } = game.teams;
        //creates a new game object with the filtered data
        const gameObject = new GameObject(id, date, time, homeid, awayid);

        //pushes the game object to the gameObjects array
        gameObjectsArr.push(gameObject);
      }
    }
  }
  console.log(gameObjectsArr);
};

GamesForNext7DaysCall();
