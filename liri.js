require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require('axios')
var moment = require('moment')
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var arg = process.argv;
var reference = [];
var theSong = '';
var theMovie = '';
var theBand = '';
var filename = 'log.txt';
var fullCommand = [];


//Gettitn reference user choise to accept several words
for (var i = 3; i < arg.length; i++) {
    reference.push(arg[i])

}
var refrenceBand = reference.join("");
// end of Refrence

// loggin full command
fullCommand.push(command);
if (reference.length != 0) {
    fullCommand.push(refrenceBand);
}



//logging function
function logging(value) {
    fs.appendFile(filename, ',' + value, function (err) {
        if (err) {
            return console.log("oh no error")
        }
    })
}
logging(fullCommand);

// commands;
//concert-this  --- spotify-this-song   --- movie-this --- do-what-it-says

if (command === 'concert-this') {
    concert(refrenceBand);
} else if (command === 'spotify-this-song') {
    spotifySong(reference);
} else if (command === 'movie-this') {
    movie(reference);
} else if (command === 'do-what-it-says') {
}

//concert-this function
function concert(referenceBand) {
    var bandUrl = "https://rest.bandsintown.com/artists/" + referenceBand + "/events?app_id=codingbootcamp";
    axios.get(bandUrl).then(
        function (response) {
            console.log("");
            console.log("*********GETTING***BAND/ARTIST***INFO: " + referenceBand + " ************");
            for (var i = 0; i < response.data.length; i++) {

                var datatime = response.data[i].datetime; //save datatime response into a variable
                console.log(datatime)
                var dataArr = datatime.split('T'); //splits the date and time in the response

                var concertResults =
                    "----------------------------------------------------------------------" +
                    "\nVanue Name: " + response.data[i].venue.name +
                    "\nvanue  Location: " + response.data[i].venue.city +
                    "\nData of the Event: " + moment(dataArr[0], "YYYY-DO-MM").format('DD/MM/YYYY')
            } console.log(concertResults);
            console.log("  ");
            console.log("***************************************************************  ");
            console.log("  ");

        })
        .catch(function (error) {
            console.log('This is the error: ' + error);
        });


}
//spotify-this-song function

function spotifySong(reference) {
    if (reference.length === 0) {
        reference = "The Sign";
    }
    spotify
        .search({ type: 'track', query: reference })
        .then(function (response) {
            console.log(" ");
            console.log("***********SPOTIFYING********" + reference+ "*************");
            console.log("  ");
            for (var i = 0; i < 5; i++) {
                var spotifyResults =
                    "---------------------------------------------------------------------" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name +
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreiview link: " + response.tracks.items[i].preview_url

                console.log(spotifyResults);


                // Artist(s)

                // the song's name

                // A preview link of the song from Spotify

                // The album that the song is from

            }
            console.log(" ");
            console.log("------------------------------------------------------------------");
            console.log(" ");
        })
        .catch(function (err) {
            console.log(err);

        });
}



//movie-this Function

function movie(reference) {
    if (reference.length === 0) {
        reference = "mr nobody";
    }
    axios.get('http://www.omdbapi.com/?t=' + reference + '&plot=short&apikey=trilogy').then(
        function (response) {
            var rotten = response.data.Ratings[1]
            //console.log('this is the rotten value : "+rotten")
            if (rotten === undefined) { rotten = "Not avaliable" }
            else { rotten = response.data.Ratings[1].Value; }
            console.log(" ");
            console.log("-----------MOVIE--INFORMATION--FOR-------" + response.data.Title + "----------");
            console.log(" ");

            var movieResults =
                "\n* Title: " + response.data.Title +
                "\n* Year: " + response.data.Year +
                "\n* IMDB Rating: " + response.data.Rated +
                "\n* Rotten Tomatoes Rating: " + rotten +
                "\n* Country Produced: " + response.data.Country +
                "\n* Language: " + response.data.Title +
                "\n* Plot: " + response.data.Language +
                "\n* Actors: " + response.data.Actors +
                "\n* " +
                "\n***************************************************************" +
                "\n ";
            console.log(movieResults);
        })
        .catch(function (error) {
            console.log('This is the error: ' + error);
        });
}


// do-what-it-says function4

function doThat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);

        }
        var dataArr = data.split(' ');
        console.log(' ')
        console.log('------------------MENU--OF--CONTENT-------------')
        console.log(' ')
        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i] === 'spotify-this-song') {
                theSong = dataArr[++i];
                console.log('--------------SPOTIFYING------------' + theSong + '-----------')
                spotifySong(theSong);
            } else if (dataArr[i] === 'movie-this') {
                theMovie = dataArr[++i];
                console.log('-------WHATCH-THIS-MOVIE----------' + theMovie + '---------')
                movie(theMovie);
            } else if (dataArr[i] === 'concert-this') {
                theBand = dataArr[++i];
                console.log('-------CHECK-OUT-THIS-BAND------' + theBand + '------------')
                concert(theBand)
            } else {
                console.log("Sorry, This command is not accpeted");

            }
        }

    })  
}
         
     
 
