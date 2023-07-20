const axios = require("axios");
const pool = require("../db");
const { next7days } = require("./dates");

const updateGames = async () => {
  try {
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
    const responses = await Promise.all(apiCalls);
    //once all promises are fulfilled,  we obtain the game dates
    //this process is to keep the dates in order
    for (const response of responses) {
      const apiResponse = response.data;
      const gameDates = apiResponse.response.map((game) => game.date);
      console.log(gameDates);
      console.log("break");
      console.log("");
    }
  } catch (error) {
    console.error("Error fetching games:", error.message);
  }
};

updateGames();
