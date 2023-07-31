const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");

//send bet request
const BetReq = async (req, res) => {
  res.json({ requestBody: req.body.color });
};

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //query db to see if user exists
    const user = await pool.query(queries.CheckIfUserExists, [email]);
    //bcrypt password
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
};

//accept bet request

//deny bet request

module.exports = {
  BetReq,
  RegisterUser,
};
