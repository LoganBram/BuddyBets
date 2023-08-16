const cron = require("node-cron");
const {
  getGamesController,
  getGamesForDay,
  getScoresController,
} = require("../controllers/databasecontroller.js");

function automation() {
  cron.schedule(
    "* * * * *",
    () => {
      console.log("everym i.");
      test();
    },
    {
      timezone: "Etc/UTC",
    }
  );

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

  cron.schedule("0 */8 * * *", () => {
    getScoresController();
    console.log("ScoresUpdated.");
  });
}

automation();
