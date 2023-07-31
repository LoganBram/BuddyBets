const express = require("express");
const routing = require("./routes/baserouting.js");

const app = express();
const port = 3000;

app.use(express.json());
app.set("view engine", "ejs");

app.use("/route", routing);

//rendering for ejs pages, routes will be changed later
app.get("/", (req, res) => res.render("index"));

app.get("/users/register", (req, res) => res.render("register"));

app.get("/users/login", (req, res) => res.render("login"));

app.get("/users/dashboard", (req, res) => res.render("dashboard"));

app.listen(port, () => console.log("listening on port " + port));
