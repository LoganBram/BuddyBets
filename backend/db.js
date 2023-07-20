const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "logan",
  host: "localhost",
  database: process.env.dbname,
  password: process.env.password,
  port: 5432,
});

module.exports = pool;
