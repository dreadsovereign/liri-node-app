var request = require("request")

var Twitter = require("twitter");

var twitterKeys = require("./keys.js");

var Spotify = require("node-spotify-api");
 
var spotify = new Spotify({
  id: "feed762f588442ff977f96d4934e29a7",
  secret: "cb6b21e0dca349f19151bfae1dfd5cc2"
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
