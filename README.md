## Sports Gambling Against Friends

- Platform meant for sports betting between friends
- Uses UTC as the time zone for game search, etc.
- basketball API, Node.js, Postgres SQL, Express, Axios, Routing, CORS, nodemon, Angular
- Utilizes UUID for user ID's in SQL
- Implements JWT and bcrypt for user authentication

NOTE: Due to the restriction of API calls with the free version, I've opted to store the game's data in my database and call my internal API, rather then calling the external api everytime. This also allows me to determine bet winners every minute as opposed to once in a while due to api restrictions.

Friend Request work by sending over the current user token from local storage, and the username of the friend based on user input. Gets the users username by running authorization of token in the backend, then pulls username associated with the token if successful.
### ENDPOINTS

# Users
**/auth/register**

Stores user data in database using bcrypt for password encryption and responds with a JWT token, the token contains the UUID user ID in the payload.
Requires name,email and password JSON data and sets local storage JWT token upon request.

**/auth/login**

Checks for the user in the database and responds with JWT token, if failed it responds with correct corresponding error message.
Requires email and password and sets JWT token in local storage upon request.

**/auth/is-verify**

Runs authorize middleware to check if JWT token in local storage is valid, returns true or corresponding error message based on case

**/auth/getfriends**

Takes token in header and finds all of the users friends, then adds the friends usernames to the response

**/auth/newfriendrequest**

Takes token in header and friends username, then stores their UUID's in friends table as either pending or accepted

# Data Caching

**/route/updategames-database**

Gets dates for this week then gets all the WNBA games and updates database with games for the next 7 days

**/route/updatescores-database**

Queries database for all games that occurred today and updates the database with the scores based on gameID

**/route/updategamestoday-database**

Updates the games all games that land 7 days in advance and runs everyday in order to maintain a 7 day schedule


# Bets

**bets/placebet/**

Updates bets table & betdetails table, betdetails uses foreign key relation.
Accepts userID's, wager, gameID and odds from frontend, and updates both tables accordingly.
GameID obtained by checking route parameters 

returns message in json if successful, otherwise returns error message



