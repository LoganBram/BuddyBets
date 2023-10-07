const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
const redis = require("redis");

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

//returns all the games in the database
const GetGamesinDB = async (req, res) => {
  await client.connect();
  const games = await pool.query(queries.GetGamesinDB);
  res.send(games.rows);
};

module.exports = {
  GetGamesinDB,
};
