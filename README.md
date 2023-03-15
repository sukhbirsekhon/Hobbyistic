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

You will need to supply your own API Keys in a .env file to access external API services & for security provide your own JWT keys.

```
GOOGLE_CUSTOM_SEARCH_API_KEY='[YOUR_KEY_HERE]'
GOOGLE_CUSTOM_SEARCH_ENGINE='[YOUR_KEY_HERE]
JWT_AUTH_KEY='[YOUR_KEY_HERE]'
OPENAI_KEY='[YOUR_KEY_HERE]'
```

### Running the API

*Use a bash/zsh interpreter, ensure you are in root directory of repository, have docker installed, and have npm cli*

- run `cd server`
- run `npm install`
- run `docker compose up -d mongo`
- run `node app.js`

### Endpoints & Documentation

All of the service endpoints are contained in the Postman collection located in the server directory of the repository root. Please use this as a development reference for integration along with closed API related pull request writeups.

In addition, all documentation regarding API endpoints can be found in the link below:

[API Documentation](https://documenter.getpostman.com/view/23759085/2s93CHuF8e)


