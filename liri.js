var fs = require("fs");
var request = require("request");

var twitter = require("twitter");

var keys = require("./keys.js");

var client = new twitter(keys.twitterKeys);

var input1 = process.argv[2];
var input2 = process.argv.slice(3).join(" ");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotifykeys);

liri ();

function liri () {

if (input1 === "my-tweets") {

var params = {
    screen_name: 'webdeveloper82',
    count: 20
};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    tweets.forEach(function(individualTweet) {
          console.log('Time Posted: ' + individualTweet.created_at);
          console.log('Tweet: ' + individualTweet.text);
          console.log("\n--------------------------------------------\n");
      })
    }
  })
} else if (input1 === "spotify-this-song") {
  if (input2.length < 1) {

            input2 = "The Sign Ace of Base";
        };
 spotify.search({ type: 'track', query: input2 }, function(err, data) {
 if (err) {
   return console.log('Error occurred: ' + err);
  }
 console.log("\n--------------------------------------------\n");
 console.log("Artist: " + data.tracks.items[0].artists[0].name); 
 console.log("Song: " + data.tracks.items[0].name);
 console.log("Preview: " + data.tracks.items[0].preview_url);
 console.log("Album: " + data.tracks.items[0].album.name);
 console.log("\n--------------------------------------------\n");
});

} else if (input1 === "movie-this") {
  if (input2.length < 1) {

      input2 = "Mr. Nobody";
  };
  request("http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&r=json&tomatoes=true&apikey=40e9cece", function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("\n--------------------------------------------------------------------\n");
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year: " + JSON.parse(body).Year);
      console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("\n--------------------------------------------------------------------\n");
    }
  })
} else if (input1 === "do-what-it-says") {
  
  fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }
  
  var dataArr = data.split(",");

  input1 = dataArr[0];
  input2 = dataArr[1];
  liri();

    });
  }
};
