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

// arguments command variable, this should produce a hyphen-separated variable if spaces are entered, or if hyphens are used(since it won't be split in that case)
const typedCommand = process.argv[2];
console.log(typedCommand+" is the typed command");

// checking to see if someting was entered in command and search term arguments, if not let user know and exit.
if (!process.argv[2]){
  console.log("Please enter a command and a search term.");
  process.exit(1);
};

if (!process.argv[3]){
  console.log("Please enter a search term.");
  process.exit(1);
};

// Concert this functionality
if (typedCommand.toLowerCase()==="concert-this"){

  // setting search url
  const artist = process.argv[3];
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
  const song = process.argv[3];
  spotify
  .search({ type: 'track', query: song })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
}

// OMDB functionality
else if (typedCommand.toLowerCase()==="movie-this"){
  const movie = process.argv[3];
  const queryURL = `http://www.omdbapi.com/?apikey=${keys.omdb.key}&t=${movie}`;

  axios({
  method:'get',
  url:queryURL,
  })
  .then(function(response){
      if (!response.data[0]){
        console.log("\nSorry, no results.\n")
        process.exit();
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
  console.log("you typed do-what-it-says");
}

else {
  console.log('please use one of these four valid arguments: "concert-this" "spotify-this-song" "movie-this" or "do-what-it-says" followed by your search term.');
};

