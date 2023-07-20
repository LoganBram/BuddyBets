const pool = require("../db.js");

const getGames = (req, res) => {
  res.send("getgames");
};

module.exports = {
  getGames,
};
