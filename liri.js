// dotenv package to read and set environmental variables
require("dotenv").config();

// spotify package
const Spotify = require('node-spotify-api');

// axios package
const axios = require("axios");

// moment package
const moment = require("moment");

// import keys.js
const keys = require("./keys.js");

// access keys information
const spotify = new Spotify(keys.spotify);
// const spotify = new Spotify({
// id: keys.spotify.id,
// secret: keys.spotify.secret
// });

// putting process.argv into a variable, because it will have to be chaged to do-what-it-says
let cliInput = process.argv;

let typedCommand = cliInput[2];



// checking to see if someting was entered in command and search term arguments, if not let user know and exit.
if (!process.argv[2]){
  console.log("Please enter a command and a search term.");
  process.exit(1);
};

// setting function to contain all if statements, so it can be called if do-what-it-says is entered

const mainFunction = function(){

// Concert this functionality
if (typedCommand.toLowerCase()==="concert-this"){

  // setting search url
  const artist = cliInput.slice(3, cliInput.length).join(" ");
    if (!artist){
      console.log("Please enter a search term for concert-this.");
      process.exit(1);
    };
  console.log(artist);
  const queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios({
  method:'get',
  url:queryURL,
  
  })
  .then(function(response) {
    console.log("\nHere are performances listed for that artist\n");
    // Console logging this in case the search has no results
    if (!response.data[0]){
      console.log("None, they do not seem to have any tour dates.");
      process.exit(1);
    };
    
    for (i=0; i<response.data.length; i++){
    console.log(response.data[i].venue.name);
    console.log(response.data[i].venue.region);
    console.log(response.data[i].venue.country);
    console.log(response.data[i].venue.city);
    console.log(moment(response.data[i].datetime).format('MM DD Y'));
    };

  }).catch(function(error){
    console.log(error);
  });
}

// Spotify functionality
else if (typedCommand.toLowerCase()==="spotify-this-song"){
    let song = "sign ace of base";
    
  if (cliInput[3]){
    song = cliInput.slice(3, cliInput.length).join(" ");
  };
  
  spotify
  .search({ type: 'track', query: song, limit: 1 })
  .then(function(response) {
    console.log("\nHere is Spotify information for that song:\n");
    console.log("Artist's name: " + response.tracks.items[0].artists[0].name);
    console.log("Song title: " + response.tracks.items[0].name);
    console.log("Spotify preview link: " + response.tracks.items[0].external_urls.spotify);
    console.log("Album: " + response.tracks.items[0].album.name);
    // console.log(response.tracks);
  })
  .catch(function(err) {
    console.log(err);
  });
}

// OMDB functionality
else if (typedCommand.toLowerCase()==="movie-this"){
  let movie = "Mr. Nobody";
  if (process.argv[3]){
  movie = cliInput.slice(3, cliInput.length).join(" ");
  };

  const queryURL = `http://www.omdbapi.com/?apikey=${keys.omdb.key}&t=${movie}`;

  axios({
  method:'get',
  url:queryURL,
  })
  .then(function(response){
    if (!response.data.Title){
      // in case the search returns no results, to avoid undefined problems
      console.log("Sorry, no results for that search.");
      process.exit(1);
    };
    console.log("\nMovie Title: "+response.data.Title);
    console.log("Release year: "+response.data.Year);
    console.log("IMDB rating: "+response.data.imdbRating);

    // loops to check if a Rotten Tomatoes rating exists, and then to console log the proper spot in the array
    let rottenPlace = 0;
    let hasRotten = false;
    for (i=0; i < response.data.Ratings.length; i++){
      if (response.data.Ratings[i].Source==="Rotten Tomatoes"){
        rottenPlace = i;
        hasRotten = true;
        // console.log("has");
      };
    };
    if (hasRotten === true){
      console.log("Rotten Tomatoes rating: "+ response.data.Ratings[rottenPlace].Value);
    }
    else {
      console.log("Rotten Tomatoes rating: None available");
    };

    console.log("Where movie was produced: "+response.data.Country);
    console.log("Language of the movie: "+response.data.Language);
    console.log("Plot of the movie: "+response.data.Plot);
    console.log("Actors in the movie: "+response.data.Actors);
  
  }).catch(function(error){
    console.log(error);
  });
}

// do what the file says functionality
else if (typedCommand.toLowerCase()==="do-what-it-says"){
  // Lifted this part from class activity, pretty much
  const fs = require("fs");
  fs.readFile("random.txt", "utf8", function(error, data) {
  
  if (error) {
    return console.log(error);
  }
  // breaking up text from text file
  const dataArray = data.split(",");
  // setting this array with filler spots to represent first two indexes of process.argv, then pushing data from text file in at end
  const typedCommandArray = ["filler", "filler"];
  typedCommandArray.push(dataArray[0], dataArray[1]);
  // re-setting global variables so main function can be run again with data from text file, then calling the main function
  typedCommand = typedCommandArray[2];
  cliInput = typedCommandArray;
  mainFunction();

});
}

else {
  console.log('please use one of these four valid arguments: "concert-this" "spotify-this-song" "movie-this" followed by your search term. Or enter "do-what-it-says" and see what happens');
};

};
mainFunction();