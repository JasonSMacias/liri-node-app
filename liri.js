// dotenv package to read and set environmental variables
require("dotenv").config();

// spotify package
var Spotify = require('node-spotify-api');

// import keys.js
const keys = require("./keys.js");

// access keys information
const spotify = new Spotify(keys.spotify);

// arguments command variable, this should produce a hyphen-separated variable if spaces are entered, or if hyphens are used(since it won't be split in that case)
const typedCommand = process.argv.slice(2,process.argv.length).join("-");
console.log(typedCommand+" is the typed command, hyphenated");

if (typedCommand.toLowerCase()==="concert-this"){
 console.log("you typed concert-this");
}

else if (typedCommand.toLowerCase()==="spotify-this-song"){
  console.log("you typed spotify-this-song");
}

else if (typedCommand.toLowerCase()==="movie-this"){
  console.log("you typed movie-this");
}

else if (typedCommand.toLowerCase()==="do-what-it-says"){
  console.log("you typed do-what-it-says");
}

else {
  console.log('please use one of these four valid arguments: "concert this" "spotify this song" "movie this" or "do what it says."');
};