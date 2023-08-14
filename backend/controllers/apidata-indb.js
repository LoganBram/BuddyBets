const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
//returns all the games in the database
const GetGamesinDB = async (req, res) => {
  const games = await pool.query(queries.GetGamesinDB);
  res.send(games.rows);
};

module.exports = {
  GetGamesinDB,
};
