const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
const redis = require("redis");

const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

const GetGamesForWeekCache = async (req, res) => {
  try {
    //cache games in redis
    await client.connect();
    const games = await client.GET("games");
    await client.quit();

    res.send(games);
  } catch (error) {
    console.error("Error fetching games:", error.message);
    res.status(500).send("Error fetching games for the 7th day");
  }
};

module.exports = {
  GetGamesForWeekCache,
};
