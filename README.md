## Sports Gambling Against Friends

- Platform meant for sports betting between friends
- Uses UTC as the time zone for game search, etc.
- basketball API, Node.js, Postgres SQL, Express, Axios, Routing, CORS, nodemon, Angular
- Utilizes UUID for user ID's in SQL
- Implements JWT and bcrypt for user authentication

NOTE: Due to the restriction of API calls with the free version, I've opted to store the game's data in my database and call my internal API, rather then calling the external api everytime

### ENDPOINTS

# Auth
**/auth/register**

Stores user data in database using bcrypt for password encryption and responds with a JWT token, the token contains the UUID user ID in the payload.

**/auth/login**

Checks for the user in the database and responds with JWT token, if failed it responds with correct corresponding error message.

**/auth/is-verify**

Runs authorize middleware to check if token in local storage is valid, returns true or proper error message based on case


# Games -> for updating the database

**/route/updategames-database**

Gets dates for this week then gets all the WNBA games and updates database with games for the next 7 days

**/route/updatescores-database**

Queries database for all games that occurred yesterday and updates the database with the scores based on gameID, meant for final check before determining winner

# Bets

**bets/placebet/**

Accepts gameid & userID's as UUID's. Places bet into bet-table, and foreign key restricted bet-details table 



