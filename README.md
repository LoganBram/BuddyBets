## Your Project Name

- Platform meant for sports betting between friends
- Uses UTC as the time zone for game search, etc.
- Technologies: Node.js, Postgres, Express, Axios, Routing, etc.
- Utilizes UUID for user ID's in SQL
- Implements JWT and bcrypt for user authentication

### ENDPOINTS

**/auth/register**

Responds with JSON containing a JWT token & response message. If the email is already used, it responds with an error message.

**/auth/login**

Responds with a JWT token if the login is successful. If it fails, it responds with either "email not found" or "incorrect password".

### Base Controller

1. Updates games in the database every 7 days.
2. Updates the game scores for the day using game id and date library.
