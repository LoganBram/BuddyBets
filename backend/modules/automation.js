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

  // Schedule the "tasks" cron job to run every minute in UTC
  const tasks = cron.schedule(
    "* * * * *",
    () => {
      getGamesController();
      console.log("GamesUpdated.");
    },
    {
      timezone: "Etc/UTC",
    }
  );
}

automation();
