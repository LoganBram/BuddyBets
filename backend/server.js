const express = require("express");
const routing = require("./routes/baserouting.js");
const authrouter = require("./routes/authrouting.js");

const app = express();
const port = 3000;

app.use(express.json());
app.set("view engine", "ejs");

app.use("/route", routing);

app.use("/auth", authrouter);

app.listen(port, () => console.log("listening on port " + port));
