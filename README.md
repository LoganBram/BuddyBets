# Friend Based Sports Gambling
This is a sports gambling platform for those who want to gamble against friends rather than the books that I built over my 2023 summer. The website allows for account management via JWT tokens, full friends list functionalities, bet request/acceptance, automated bet judgment every minute, uses a REST API for backend communication, and data caching of games.

## Motivation

The purpose of this project was to learn and grow. After spending some time building multiple smaller frontend applications as well as learning the basics of backend I decided it was time to learn how to combine the two. I also wanted something that would be largely backend as well as something that would cause my mind to twist, which working with timezones and building the queries to judge bets most definitely did. 

## Technologies Used
- Angular
- Node.js
- Express
- Postgres
- JWT Tokens
- Basketball API (Rapid API)

# ENDPOINTS

## Users
**/auth/register**

Stores user data in the database using bcrypt for password encryption and responds with a JWT token, the token contains the UUID user ID in the payload.
Requires name, email and password JSON data and sets local storage JWT token upon request.

**/auth/login**

Checks for the user in the database and responds with JWT token, if failed it responds with correct corresponding error message.
Requires email and password and sets JWT token in local storage upon request.

**/auth/is-verify**

Runs authorize middleware to check if JWT token in local storage is valid, returns true or corresponding error message based on case

**/auth/getfriends**

Takes token in header and finds all of the users friends, then adds the friends usernames to the response

**/auth/newfriendrequest**

Takes token in header and friends username, then stores their UUID's in friends table as either pending or accepted

**/auth/acceptfriendrequest**

Accepts friendrequest id, sets status to accepted in friends table

**/auth/denyfriendrequest**

Accepts friendrequest id, deletes from table

**/auth/getfriends**

Accepts token in header, returns friends list

**/auth/getuserid**

Accepts token in header, returns userid

## Bets

**bets/placebet/**

Updates bets table & betdetails table, betdetails uses foreign key relation.
Accepts userID's, wager, gameID and odds from frontend, and updates both tables accordingly.
GameID obtained by checking route parameters 

returns message in json if successful, otherwise returns error message

**bets/getpendingbetsreceived/**
accepts user id using jwt, gets bet requests recieved

**bets/getpendingbetssent/**
accepts userid using jwt, gets bets they sent

**bets/getongoingbets/**

accepts userid using jwt, returns ongoing bets for user

**bets/acceptbet/**

accepts bet id, sets status to accepted

**bets/denybet/**

accepts bet id, sets status to denied

## Games

**/apidata-inDB/GetGamesinDB**

Returns all gamees in the database

# CRON AUTOMATION

## Every Day

**getGamesForDay**

updates the games that are to occur in 7 days in database to keep a constant 7 day forecast

## Every Minute

**getScoresController**

Updates scores for the games along with game status

**DetermineWinners**

Uses SQL query to determine winner and input winnerid, query returns the data that has been updated with a winnerid then distributes credits








