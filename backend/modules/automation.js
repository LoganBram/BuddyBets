const cron = require("node-cron");
const {
  getGamesController,
  getGamesForDay,
  getScoresController,
} = require("../controllers/databasecontroller.js");
const { DetermineWinners } = require("../controllers/betscontroller.js");

function automation() {
  // 10 minutes past new day everyday, will update the games 7 days from now
  //to keep a concurrent 7 days of games in the database
  cron.schedule(
    "10 0 * * *",
    () => {
      getGamesForDay();
      console.log("GamesUpdated.");
    },
    {
      timezone: "Etc/UTC",
    }
  );

  cron.schedule("* * * * *", async () => {
    await getScoresController();
    await DetermineWinners();
  });
}

automation();
