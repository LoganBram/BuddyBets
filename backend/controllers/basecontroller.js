const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
const { GamesForNext7DaysCall } = require("../modules/datafetch.js");

//updates games for next 7 days
//updates games for next 7 days
const getGames = async (req, res) => {
  try {
    const games = await GamesForNext7DaysCall();
    games.map((game) => {
      pool.query(queries.addGames, [
        game.id,
        game.startdate,
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

module.exports = {
  getGames,
};
