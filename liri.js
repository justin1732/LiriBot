require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify); 
var filename = './log.txt';
var request = require("request");
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
        }
    }
    function getMovie() {
            var movieName = secondCommand;
               var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

        request(queryUrl, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                var body = JSON.parse(body);
                
                logOutput('================ Movie Info ================');
                logOutput("Title: " + body.Title);
                logOutput("Release Year: " + body.Year);
                logOutput("IMdB Rating: " + body.imdbRating);
                logOutput("Country: " + body.Country);
                logOutput("Language: " + body.Language);
                logOutput("Plot: " + body.Plot);
                logOutput("Actors: " + body.Actors);
                logOutput("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
                logOutput("Rotten Tomatoes URL: " + body.tomatoURL);
                logOutput('==================THE END=================');

            } else {
                //else - throw error
                console.log("Error occurred.")
            }
        
            if (movieName === "Mr. Nobody") {
                console.log("-----------------------");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
            }
        });
    }
    function doWhat() {
    
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (!error);
            console.log(data.toString());
           
            var cmds = data.toString().split(',');
        });
    }

    mySwitch(userCommand);