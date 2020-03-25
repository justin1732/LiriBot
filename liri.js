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
                logIt(i);
                logIt("artist(s): " + songs[i].artists.map(getArtistNames));
                logIt("song name: " + songs[i].name);
                logIt("preview song: " + songs[i].preview_url);
                logIt("album: " + songs[i].album.name);
                logIt("-----------------------------------");
                
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
                
          default:
        console.log("\nI'm sorry, that's not something I recognize, try one of the following commands: \n\n  1. For a random search: node liri.js do-what-it-says \n\n  2. To search a movie title: node liri.js movie-this \n\n  3. To search Spotify for a song: node liri.js spotify-this-song \n\n  4. Check out Concerts Using 'concert-this'\n");
        break;
        }
    }
    function getMovie() {
            var movieName = secondCommand;
               var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                var body = JSON.parse(body);
                
                logIt('================ Movie Info ================');
                logIt("Title: " + body.Title);
                logIt("Release Year: " + body.Year);
                logIt("IMdB Rating: " + body.imdbRating);
                logIt("Country: " + body.Country);
                logIt("Language: " + body.Language);
                logIt("Plot: " + body.Plot);
                logIt("Actors: " + body.Actors);
                logIt("Rotten Tomatoes Rating: " + body.Ratings[2]);
                logIt("Rotten Tomatoes URL: " + body.tomatoURL);
                logIt('==================THE END=================');

            } else {
                //else - throw error
                logIt("Error occurred.")
            }
        
            if (movieName === "Mr. Nobody") {
                logIt("-----------------------");
                logIt("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                logIt("It's on Netflix!")
                logIt("It stars the one and only Rich Hosek!");
            }
        });
    }
function getConcert(search) {
    let concertQueryURL = "https://rest.bandsintown.com/artists/" + secondCommand + "/events?app_id=codingbootcamp"
    axios.get(concertQueryURL).then(
      function(response) {
        for (let i = 0; i < 10; i++) {
          logIt("--------------------------------------------------------------------------------");
          logIt("Venue: " + response.data[i].venue.name);
          logIt("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
          logIt("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
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
    