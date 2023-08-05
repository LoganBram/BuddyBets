- Platform meant for sports betting between friends
- uses UTC as time zone for game search etc
- node, postgre, express, axios, routing, 
- UUID for user ID's in SQL
- JWT,bcrypt for user auth
#ENDPOINTS

/auth/register

responds with json of token & response message, if email already used responds with error message

/auth/login

responds with token if successful, if failed responds with either email not found or incorrect password
