// check the environment variable, if there is no set variable, then it will be set to development
var env = process.env.NODE_ENV || 'development';

// fetch environment config data from config.json file
var config = require('./config.json');
var envConfig = config[env];

// add environment config values to process.env to let the app know which environment we are working in
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);