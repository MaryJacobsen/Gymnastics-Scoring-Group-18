# 10.0-Software-Group-18

The gymnastics meets held in Gill Coliseum are fast paced, usually televised competitions attended by thousands of fans. In order to run the competitions smoothly and provide a positive experience for fans, athletes, and staff, there must be a way to record, organize, and display the scores that the judges give to each routine using the hardware already in Gill Coliseum. The Oregon State Gymnastics Team would like new scoring software. The pre-existing software used to display and keep scores has become outdated and has issues displaying on the current hardware. Because of this, it is important for new, custom software to be built that can accurately and elegantly display scores on Gill Coliseum's hardware in a readable manner that is intuitive for fans to understand while providing all the necessary functionality such as exporting to specific formats.

# How to run code

Since our project calls for a containerized API based web server, Docker is needed to run the code. You can install Docker [here](https://www.docker.com/products/docker-desktop), but it is important to note that if you are running any version of Windows that isn't enterprise edition you will instead need to download [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/). Once installed, open the `Code` folder and use the command `docker-compose up` this will run the server, to run as a background process use the command `docker-compose up -d`. Once the server is running open your favorite web browser and navigate to the [edit lineup page](http://localhost:8000/lineup.html) or the [scoring page](http://localhost:8000/scoring.html). Note, if you are using docker toolbox, `localhost:8000` will not work, and instead you will need to grab the ip address given by the virtual machine which can be found underneath Moby Dock (Docker's whale logo). Our current build only has these two web pages working, but we also have a plethora of API endpoints that can be accessed. These can be found by looking at the created endpoints in the  `api` folder inside the `Code` folder. We recommend an application called [postman](https://www.getpostman.com/) to query the API.

# Using Postman to Test

To test endpoints with Postman you must enter the endpoint and the HTTP method and click on send.
> Ex. `GET http://localhost:8000/player/Oregon State University` will return a list of all players that are part of
> the OSU gymnastics team.

## Endpoints
### GET
#### Team
  * /team/:id
    * returns the team name with :id
  * /team/teams
    * returns all team names
#### Player
  * /player/:teamName
    * returns all players that belong to the :teamName
#### Lineup
  * /lineup/:team/:event
    * returns the ordered lineup of :team doing :event
### POST
  * /team/
    * Creates a new team
  * /player/
    * Creates a new player
  * /lineup/
    * Creates a new lineup
### PUT 
### DELETE
