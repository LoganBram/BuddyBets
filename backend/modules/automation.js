const cron = require("node-cron");
const {
  getGamesController,
  getGamesForDay,
  getScoresController,
} = require("../controllers/databasecontroller.js");

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

  cron.schedule("0 */8 * * *", async () => {
    await getScoresController();
    console.log("ScoresUpdated.");
  });

  //NEXT STEPS
  //in get scores controller, add a function to update DB if game is completed
  //then check all games that are completed and all assocaited bets and declare winner
}

automation();
