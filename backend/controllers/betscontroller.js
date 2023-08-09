const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");

const BetRequest = async (req, res) => {
  try {
    const { user1, user2, amount, gameid } = req.body;

    const placebet = await pool.query(queries.PlaceBet, [
      123, // Make sure `gameid` is an integer or numeric data type in the database
      "f51dd5a1-77c0-4ca0-90e4-53f06b4a28e9", // Corrected UUID format with single quotes
      "f51dd5a1-77c0-4ca0-90e4-53f06b4a28e9", // Corrected UUID format with single quotes // Make sure `amount` is an integer or numeric data type in the database
    ]);
    res.send("Success");
  } catch (err) {
    console.error(err.message);
    res.send("Error on SQL query");
  }
};

module.exports = {
  BetRequest,
};
