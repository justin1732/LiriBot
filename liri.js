require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment= require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify); 
var filename = 'log.txt';
var request = require("request");
var fs = require ("fs");
var log = require('simple-node-logger').createSimpleFileLogger(filename);
log.setLevel('all');
var userCommand = process.argv[2];
var secondCommand = process.argv[3];
for (var i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
}
var getArtistNames = function (artist) {
    return artist.name;
};

var getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "What's my age again";
    }

spotify.search(
        {
            type: "track",
            query: secondCommand
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        
        }

    );
};
    function mySwitch(userCommand) {

 
        switch (userCommand) {
           
            case "spotify-this-song":
                getSpotify();
                break;
    
            case "movie-this":
                getMovie();
                break;
    
            case "do-what-it-says":
                doWhat();
                break;
                
            case "concert-this":
                getConcert();
                break;
        }
    }
    function getMovie() {
            var movieName = secondCommand;
               var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                var body = JSON.parse(body);
                
                console.log('================ Movie Info ================');
                console.log("Title: " + body.Title);
                console.log("Release Year: " + body.Year);
                console.log("IMdB Rating: " + body.imdbRating);
                console.log("Country: " + body.Country);
                console.log("Language: " + body.Language);
                console.log("Plot: " + body.Plot);
                console.log("Actors: " + body.Actors);
                console.log("Rotten Tomatoes Rating: " + body.Ratings[2]);
                console.log("Rotten Tomatoes URL: " + body.tomatoURL);
                console.log('==================THE END=================');

            } else {
                //else - throw error
                console.log("Error occurred.")
            }
        
            if (movieName === "Mr. Nobody") {
                console.log("-----------------------");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!")
                console.log ("It stars the one and only Rich Hosek!");
            }
        });
    }
function getConcert(search) {
    let concertQueryURL = "https://rest.bandsintown.com/artists/" + secondCommand + "/events?app_id=codingbootcamp"
    axios.get(concertQueryURL).then(
      function(response) {
        for (let i = 0; i < 10; i++) {
          console.log("--------------------------------------------------------------------------------");
          console.log("Venue: " + response.data[i].venue.name);
          console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
          console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
        }
      })
      .catch(function(error) {
     console.log(error);
    });
  }

    function logIt(dataToLog) {

        console.log(dataToLog);
    
        fs.appendFile('log.txt', dataToLog + '\n', function(err) {
            
            if (err) return logIt('Error logging data to file: ' + err);	
        });
    }
    mySwitch(userCommand);
    logIt(mySwitch);