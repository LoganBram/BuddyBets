const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");

const getGames = (req, res) => {
  pool.query(queries.getAllTest, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getGames,
};
