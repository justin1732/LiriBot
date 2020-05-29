# LiriBot
This was our first individual project after finishing up our first group project in the University of Denver FullStack Coding Bootcamp.

This app was also our first major foray into handling Node JS and running something with this. This app runs against a few APIs to check and understand information a local user's terminal. The full demonstration can be see at: https://youtu.be/LzYuug6qfZU

# Installation
My repo can be found at: https://github.com/justin1732/LiriBot

For a local version, I recommend using Visual Studio Code. Navigate over to my GitHub repo, click clone, and be sure to type in the following below:
git clone
Navigate over to the terminal and open up the area around server.js in the terminal. Then type:
 node liri.js
 
 The app should be running now.
 
 # Using this App
 After the app is running in terminal, select which command you want to run against the liri node. 
 -"spotify-this-song" runs a search against the Spotify API and returns information about the song you are looking for.
 -"movie-this" runs a search against a Movie API and returns information about the movie you are looking for
 -"concert-this" runs a search checking out when a concert for that search term will run, if any.
 -"do-what" is a command for catching invalid commands.
 
 Finally, liri saves the last known search into the local txt file for easy searching and navigating.
 
 # Technologies Used
 This app primarily uses Node JS for searching and executing the JS scripts within. This also uses log, logger, axios, dotenv, json, and inquirer for rendering and interpreting the data that is being sent to it.
 
 ## Contact Information
I am available to be found at justteach17@gmail.com and my website is justin1732.github.io 
