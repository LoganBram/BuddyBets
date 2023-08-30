const pool = require("../db.js");
const queries = require("../queries/queriesfile.js");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./../utils/jwtgenerator.js");

//user registration
const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    //query db to see if user exists
    const user = await pool.query(queries.CheckIfUserExists, [email]);
    if (user.rows.length !== 0) {
      //user found in db, send error
      return res
        .status(401)
        .send("user already exists, please use different email");
    }

    //query db to see if username taken
    const user_name = await pool.query(queries.CheckIfUsernameExists, [
      username,
    ]);
    if (user_name.rows.length !== 0) {
      //user found in db, send error
      return res
        .status(401)
        .send("user already exists, please use different username");
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
      username,
    ]);

    //5) generating JWT token with returned data from SQL query
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token, response: "registered" });
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
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json("Password Incorrect");
    }
    //4. give jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token, response: "success" });
  } catch (err) {
    res.send(err.message);
  }
};

//verification done in authorization file in middleware folder which is called beforehand
//in routing
const Verified = async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Please login again or ");
  }
};

const Dashboard = async (req, res) => {
  try {
    //after authrization method runs via the routing to this controller (check routes, authrouting)
    //req.user holds the verifed payload of user data aka the user id
    //res.send(req.user);

    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user,
    ]);

    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Username Not Found, Please Register");
  }
};

const NewFriendRequest = async (req, res) => {
  const { friendusername } = req.body;
  const useruuid = req.user;

  // check if friend exists
  try {
    const friend = await pool.query("SELECT * FROM users WHERE username = $1", [
      friendusername,
    ]);
    if (friend.rows.length === 0) {
      return res.send({
        message: "Friend not found, please doublecheck username",
      });
    }
  } catch {
    return res.send({
      message:
        "unexpected error verifying your friend exists, please try again",
    });
  }
  //req.user is username of the user, authorization middleware runs before this and sends the user id as req.user
  //Now that we know the user exists get the username
  const frienddata = await pool.query(queries.GetUUIDFromusername, [
    friendusername,
  ]);
  const frienduuid = frienddata.rows[0].user_id;
  //filter just for username

  //Check if friend request already exists/already a friend
  try {
    const a = await pool.query(queries.CheckIfDuplicateRequest, [
      useruuid,
      frienduuid,
    ]);
    if (a.rows.length !== 0) {
      return res.send({
        message:
          "Either friend request pending is already or you are already friends",
      });
    }
  } catch (error) {
    return res.send({
      message:
        "unexpected error verifying you dont have a pending request to the user already, please try again",
    });
  }

  try {
    await pool.query(queries.SendFriendRequest, [useruuid, frienduuid]);
    res.send({
      message: "friend request to user " + friendusername + " successful",
    });
  } catch (error) {
    res.send({ error: "unexpected error" });
  }
};
//takes token and gets the users friends, then adds the friends usernames
//to the response for display
const GetUserFriends = async (req, res) => {
  try {
    //gets all friends of the user
    const friends = await pool.query(queries.GetAllFriends, [req.user]);

    console.log(friends.rows[0]);
    console.log(req.user);

    //iterates through the friends of the user and gets their username

    for (let i = 0; i < friends.rows.length; i++) {
      //gets username of the user
      const SenderUsername = await pool.query(queries.GetUsernamefromUUID, [
        friends.rows[i].user_id,
      ]);

      const ReceiverUsername = await pool.query(queries.GetUsernamefromUUID, [
        friends.rows[i].friend_id,
      ]);

      //adds the found usernames to dict
      friends.rows[i].sender_username = SenderUsername.rows[0].username;
      friends.rows[i].receiver_username = ReceiverUsername.rows[0].username;
      friends.rows[i].currentuser = req.user;
    }

    //adds the users username to the first index of the dict incase it is needed
    //not in for loop because we dont need to repeat the same information

    res.send(friends.rows);
  } catch (error) {
    console.log(error);
    res.send("issue finding the friends, please try again");
  }
};

//runs authorization middleware in routes/authrouting when this endpoint is called
//req.user contains user id from token verification and payload

const GetUserId = async (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (error) {
    res.send("error getting UserId, please login again");
  }
};

const AcceptFriendRequest = async (req, res) => {
  console.log(req.body);
  try {
    await pool.query(queries.AcceptFriendRequest, [req.body.id]);
    res.send("friend request accepted");
  } catch (error) {
    res.status(400).send("backend error accepting friend request");
  }
};

const DenyFriendRequest = async (req, res) => {
  try {
    await pool.query(queries.DenyFriendRequest, [req.body.id]);
    res.send("friend request denied");
  } catch (error) {
    res.status(400).send("backend error denying friend request");
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
  Verified,
  Dashboard,
  NewFriendRequest,
  GetUserFriends,
  GetUserId,
  AcceptFriendRequest,
  DenyFriendRequest,
};
