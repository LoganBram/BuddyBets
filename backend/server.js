const express = require("express");
const routing = require("./routes/baserouting.js");
const jwt_router = require("./routes/jwtAuth.js");

const app = express();
const port = 3000;

app.use(express.json());
app.set("view engine", "ejs");

app.use("/route", routing);

app.use("/auth", jwt_router);

app.listen(port, () => console.log("listening on port " + port));
