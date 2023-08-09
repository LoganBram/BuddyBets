## Sports Gambling Against Friends

- Platform meant for sports betting between friends
- Uses UTC as the time zone for game search, etc.
- basketball API, Node.js, Postgres SQL, Express, Axios, Routing, CORS, nodemon, Angular
- Utilizes UUID for user ID's in SQL
- Implements JWT and bcrypt for user authentication

### ENDPOINTS

**/auth/register**

Stores user data in database using bcrypt for password encryption and responds with a JWT token, the token contains the user ID in the payload.

**/auth/login**

Checks for user in database and responds with JWT token, if failed it responds with either email not found or incorrect password in JSON.

### Base Controller - Basketball API

1. Updates games in the database every 7 days.
2. Updates the game scores for the day using game id and date library.
