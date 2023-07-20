const Pool = require("pg").Pool;

const pool = new Pool({
  user: "logan",
  host: "localhost",
  database: "wagering",
  password: process.env.password,
  port: 5432,
});

module.exports = pool;
