const express = require("express");
const routing = require("./routes/baserouting.js");
const authrouter = require("./routes/userrouting.js");
const betsrouting = require("./routes/betsrouting.js");
const datarouting = require("./routes/data-fromdb.js");

const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

app.use("/route", routing);

app.use("/auth", authrouter);

app.use("/bets", betsrouting);

app.use("/database", datarouting);

app.listen(port, () => console.log("listening on port " + port));
