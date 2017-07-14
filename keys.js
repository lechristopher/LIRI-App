// var Twitter = require('twitter');
//
// function twitter() {
//
//   console.log('this is loaded');
//
//   exports.twitterKeys = {
//     consumer_key: 'A47AFeTvf9d1vjpCUwauXxQN2',
//     consumer_secret: '	YG2MuWLBHrHrEcju9QoP12So61cZo9kDLeQ7ufDOOghRg3Rw64',
//     access_token_key: '	734978592388456448-sMQrt4MXTL5hgh8MXrqRt87o5U4wRPW',
//     access_token_secret: 'LxnoTfaoFVbDU6oX5vLjkm2xM8EpGJ3pm2tsyQWg1OlSo',
//   }
//
// }
var request = require("request");

var movieInput = process.argv;

var movieName = "";

if (movieName.length === 3) {

  movieName = "Mr. Nobody";
}

for (var i = 2; i < movieInput.length; i++) {

  if (i > 2 && i < movieInput.length) {

    movieName = movieName + "+" + movieInput[i];
  }

  else {
    movieName += movieInput[i];
  }

}
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMBD Rating: " + JSON.parse(body).Ratings[0].Value);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});
