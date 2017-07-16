var Twitter = require('twitter');
var Movie = require("request");
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var fs = require("fs");

var command = process.argv[2];
var userInput = process.argv[3];

var song = "";

if(command === "my-tweets"){
  myTweets();
}
if(command === "spotify-this-song"){
  mySpotify();
}
if(command === "do-what-it-say"){
  doWhatISay();
}
if(command === "movie-this"){
  myMovie();
}

//-Twitter----------------------------------------------------------------------

function myTweets() {

var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});

var params = {screen_name: 'grizz_le', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log("\n---------------------\n");
    for (var i = 0; i < tweets.length; i++) {
    console.log(tweets[i].user.screen_name)
    console.log(tweets[i].text);
    console.log("\n---------------------\n");
      }
    }
  });
}

//Spotify-----------------------------------------------------------------------
//
function mySpotify() {
  if (process.argv.length > 3) {
    for (var i = 3; i < process.argv.length; i++) {
        song = song + "+" + process.argv[i]
    }
  }
  song = song || "The Sign, Ace of Base";

  var spotify = new Spotify({
    id: keys.spotifyKeys.id,
    secret: keys.spotifyKeys.secret
  });

  spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  console.log("\n---------------------\n");
  console.log(data.tracks.items[0].artists[0].name);
  console.log(data.tracks.items[0].name);
  console.log(data.tracks.items[0].preview_url);
  console.log(data.tracks.items[0].album.name);
  console.log("\n---------------------\n");
    });
}

//Do What I say-----------------------------------------------------------------

function doWhatISay(){
	fs.readFile('random.txt', 'utf8', function(error, data){
		if (!error) {
		 console.log(data);
		} else {
			console.log('Error occurred' + error);
		}
	});
};

//-Movie------------------------------------------------------------------------


function myMovie(){
  var movieInput = process.argv;
  var movieName = "";

if (movieInput.length === 3) {
  movieName = "Mr. Nobody";
}

for (var i = 3; i < movieInput.length; i++) {

  if (i > 3 && i < movieInput.length) {

    movieName = movieName + "+" + movieInput[i];
  }

  else {
    movieName += movieInput[i];
  }

}
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

Movie(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {
    console.log("\n---------------------\n");
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMBD Rating: " + JSON.parse(body).Ratings[0].Value);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("\n---------------------\n");
  }
});
}
