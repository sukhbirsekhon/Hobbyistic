# Hobbyistic

Our Senior Design project.

Hobbies provide a fulfilling and productive use of one’s free time. Some people with struggling starting new hobbies while staying on track. 

We want to create a web application on the computer that would allow users to learn hobbies in a self-paced workflow. Users could input their hobbies, set milestones/goals, and track their time if desired. In addition, users would receive a notification based on their schedule of when to work on their hobby or status updates on their progress in reaching their goals. 

Hobbyistic is a web application that helps provide a fun and efficient way to learn and track your hobbies. This app is for users who struggle with time management or commitment to staying focused on their goal. This app will be driven towards having fun in learning hobbies. The user will be given goal based sections and data to help them visualize their progress. The user can choose how much time they want to give on a daily week to week schedule to help with their progress and choose to be given optional notifications to motivate them in the right direction.

## Personnel
* Jack McHugh - Researcher / Back-end Developer
* Mahesh Gowda - Researcher / Database Manager / Full-Stack Support
* Sukhbir Sekhon - Full Stack Developer
* Nicholas Lawson - Front-end Developer / Project Manager
* Brendan Sitton - Cybersecurity Specialist / Public Speaker / Tester

## Stack
Node.JS - MongoDB - Express - Angular

## API Documementation

### .ENV Config

You will need to supply your own API Keys in the .env file to access external API services & for security provide your own JWT keys.

```
GOOGLE_CUSTOM_SEARCH_API_KEY='[YOUR_KEY_HERE]'
GOOGLE_CUSTOM_SEARCH_ENGINE='[YOUR_KEY_HERE]
JWT_AUTH_KEY='[YOUR_KEY_HERE]'
```

### Running the API

*Use a bash/zsh interpreter, ensure you are in root directory of repository, have docker installed, and have npm cli*

- run `cd server`
- run `npm install`
- run `docker compose up -d mongo`
- run `node app.js`


### Register

Use a request like this to register an account with the API.

```
curl --location --request POST 'localhost:3000/api/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "John Appleseed",
    "email": "jappleseed@example.com",
    "password": "eU17n50x&*ZyWBnAzolYQ4E"
}
```

### Authenticate

JWT authentication mechanism using Passport.JS & Express. Test the method by calling the following POST URL:

```
curl --location --request POST 'http://localhost:3000/api/login/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user": {
        "email": "1234@gmail.com",
        "password": "password"
    } 
}'
```

Body payload:

```
{
    "user": {
        "email": "1234@gmail.com",
        "password": "password"
    } 
}
```

Make sure the request username and password is registered first and you should receive a response like this:

```
{
    "user": {
        "email": "1234@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjEzMmYyZjYyNTNmOTdmMTZmYzQxOCIsImVtYWlsIjoiMTIzNEBnbWFpbC5jb20iLCJleHAiOjE2NzI1MTAxNDcsImlhdCI6MTY2NzMyMjU0N30.bl7NY9o_ChXjLzAi93V4g3IyVwcYd4BbJVF9aV1TwXk"
    }
}

/*
decoded {"alg":"HS256","typ":"JWT"}{"id":"636132f2f6253f97f16fc418","email":"1234@gmail.com","exp":1672509530,"iat":1667321930}	ZxL~oE/W
*/
```
To test that your JWT token was generated correctly and will authenticate at a given endpoint, make the following call to the "Test Auth Endpoint"
**YOU MUST GENERATE YOUR OWN JTW, DON'T USE THE EXAMPLE, AS IT WILL NOT WORK**

```
curl --location --request GET 'http://localhost:3000/api/testauth' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjEzMmYyZjYyNTNmOTdmMTZmYzQxOCIsImV4cCI6MTY3Mjk1OTc2MCwiaWF0IjoxNjY3Nzc1NzYwfQ.-y5asbq9x7LreiD2PmtRkbYrHhCxR0VTckRyGoRfEFI' \
--header 'Content-Type: application/json' \
--data-raw '{}'
```

If everything worked correct, you should receive a 200 OK. If not, the socket will hang a or you will get a 401

### Authentication Mechanism Testing

Here is the code for the Test Auth method in the user controller; please use this as an authentication implementation template when creating new endpoints.

Controller method:
```
//this code should be in any method that requires authentication
module.exports.testauth = (req, res, next) => {
     //check to make sure there is a payload, if not return 401
    if (req.auth == null) {
        return res.sendStatus(401); 
    }
    //find the user associated with the request using the User model, if user cannot be found, return 401.
    //The 
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.sendStatus(401); 
        }
    return res.sendStatus(200)
    })(req, res, next);
}
```

Router method:

```
const auth = require('../routes/auth');
// add auth middleware to router for JWT authentication, it will add the JWT payload in the header to the request object at req.auth
router.get('/testauth', auth.required, userController.testauth);
```

### User Endpoints

All of the service endpoints are contained in the Postman collection located in the server directory of the repository root. Please use this as a development reference for integration along with closed API related pull request writeups.


