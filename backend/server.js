const express = require("express");
const routing = require("./routes/baserouting.js");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/route", routing);

app.get("/", (req, res) => res.render("index"));

app.get("/users/register", (req, res) => res.render("login"));

app.get("/users/dashboard", (req, res) => res.render("dashboard"));

app.listen(port, () => console.log("listening on port " + port));
