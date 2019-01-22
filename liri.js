// dotenv package to read and set environmental variables
require("dotenv").config();

// import keys.js
var keys = require("./keys.js");

// access keys information
var spotify = new Spotify(keys.spotify);
