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

// arguments command variable, this should produce a hyphen-separated variable if spaces are entered, or if hyphens are used(since it won't be split in that case)
const typedCommand = process.argv[2];
console.log(typedCommand+" is the typed command");

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
    for (i=0; i<response.data.length; i++){
    console.log(response.data[i].venue.name);
    console.log(response.data[i].venue.region);
    console.log(response.data[i].venue.country);
    console.log(response.data[i].venue.city);
    console.log(moment(response.data[i].datetime).format('MM DD Y'));
    };
  });
}

// Spotify functionality
else if (typedCommand.toLowerCase()==="spotify-this-song"){
  console.log("you typed spotify-this-song");
}

// OMDB functionality
else if (typedCommand.toLowerCase()==="movie-this"){
  const movie = process.argv[3];
  const queryURL = `http://www.omdbapi.com/?apikey=${keys.omdb.key}&t=${movie}`;
  console.log(queryURL);

  axios({
  method:'get',
  url:queryURL,
  })
  .then(function(response){
    
      console.log("Movie Title: "+response.data.Title);
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
    
  });
}

// do what the file says functionality
else if (typedCommand.toLowerCase()==="do-what-it-says"){
  console.log("you typed do-what-it-says");
}

else {
  console.log('please use one of these four valid arguments: "concert-this" "spotify-this-song" "movie-this" or "do-what-it-says" followed by your search term.');
};

