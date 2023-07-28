//used for short functions that call data from the stored db

const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
//takes a date and returns array of objects containing gameid's for date
const getStoredGameid_BasedOnDate = async (date) => {
  const games = await pool.query(queries.getGameidForDay, [`%${date}%`]);
  return games.rows;
};

module.exports = { getStoredGameid_BasedOnDate };