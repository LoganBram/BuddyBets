- Platform meant for sports betting between friends
- uses UTC as time zone for game search etc
- node, postgre, express, axios, routing, 
- UUID for user ID's in SQL
- JWT,bcrypt for user auth
  
###ENDPOINTS
/auth/register

responds with json of JWT token & response message, if email already used responds with error message

/auth/login

responds with JWT token if successful, if failed responds with either email not found or incorrect password

###Base Controller
1) updates games in database every 7 days
2) updates the game scores for the day using game id and date library


