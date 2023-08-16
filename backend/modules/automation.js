const cron = require("node-cron");
const { getGamesController } = require("../controllers/databasecontroller.js");

function automation() {
  const task = cron.schedule(
    "* * * * *",
    () => {
      test();
      console.log("everym i.");
    },
    {
      timezone: "Etc/UTC",
    }
  );

  // 10 minutes past new day everyday, will update the games 7 days from now
  //to keep a concurrent 7 days of games in the database
  const tasks = cron.schedule(
    "10 0 * * *",
    () => {
      getGamesForDay();
      console.log("GamesUpdated.");
    },
    {
      timezone: "Etc/UTC",
    }
  );
}

automation();
