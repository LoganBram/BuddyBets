const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
const { GamesForNext7DaysCall } = require("../modules/datafetch.js");

const getGames = (req, res) => {
  const games = GamesForNext7DaysCall();
  games.map((game) => {
    pool.query(queries.addGames, [
      game.ID,
      game.startdate,
      game.homeid,
      game.awayid,
    ]);
  });
};

module.exports = {
  getGames,
};
