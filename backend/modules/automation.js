const cron = require("node-cron");
const { test } = require("../controllers/databasecontroller.js");

const task = cron.schedule("* * * * *", () => {
  test();
  console.log("started");
});

task.start();
