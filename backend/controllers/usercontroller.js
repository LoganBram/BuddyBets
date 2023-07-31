const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./../utils/jwtgenerator.js");

//send bet request
const BetReq = async (req, res) => {
  res.json({ requestBody: req.body.color });
};

//user registration
const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //query db to see if user exists
    const user = await pool.query(queries.CheckIfUserExists, [email]);
    if (user.rows.length !== 0) {
      //user found in db, send error
      return res
        .status(401)
        .send("user already exists, please use different email");
    }

    // 3) bcrypt password if email not in use
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    //4) add user to db, returns all the data inserted vi SQL query
    //so we can use it below

    const newUser = await pool.query(queries.InsertUser, [
      name,
      email,
      bcryptPassword,
    ]);

    //5) generating JWT token with returned data from SQL query
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
};

const LoginUser = async (req, res) => {
  try {
    //1. destructure req.body
    const { email, password } = req.body;
    //2. check if user exists, throw error if not
    const user = await pool.query(queries.CheckIfUserExists, [email]);

    if (user.rows.length === 0) {
      return res.status(401).json("Email not found");
    }
    //3. check if incoming pass matches db pass
    //bcrypt compare uses your hashing when comparing automatically
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json("Password Incorrect");
    }
    //4. give jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json(token);
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  BetReq,
  RegisterUser,
  LoginUser,
};
