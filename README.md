LIRI-BOT (a language Interpretation and Recognition Interface)

LIRI is a command line node app that takes in parameter and give you back data based off the following parameters.
*concert-this 
*movie-this
*Spotify-this-song
*Do-what-it-says

Getting Started: 

Download the screenshots folder to access the animations of each command. This will allow you to better see how LIRI works with each given command.

Conert-this


This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal: 

Name of the vanue 
Venue location 
Date of the Event (use moment to format this as "MM/DD/YYYY")


Spotify-this-song:

This will show the following information about the song in your terminal/bash window

*Artis(s)
*The song's name 
*A preview link of the song from Spotify 
*The ablum that the song is from

Movie-this


This will output the following information to your terminal/bash window:

*Thitle of the movie.
*Year the movie came out.
*IMDB Rating of the movie.
*Rotten Tomatoes Rating of the movie.
*Country where the movie was produced.
*Language of the movie.
*Plot of the movie.
*Actors in the movie.


do-what-it-says:





LIRI   will use the text form "random.txt" and call on of LIRI's commands. it should run Spotify-this-song for "I want it That way".

Technologies Used.

*NPM packages
*Javascript
*Node>js
*Bands in Town API
*OMDB API
*Spotify API