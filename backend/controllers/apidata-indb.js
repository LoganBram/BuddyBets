const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");

const GetGamesinDB = async (req, res) => {
  res.send({ hi: "hello" });
};

module.exports = {
  GetGamesinDB,
};
