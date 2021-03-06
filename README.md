# 10.0-Software-Group-18

The gymnastics meets held in Gill Coliseum are fast paced, usually televised competitions attended by thousands of fans. In order to run the competitions smoothly and provide a positive experience for fans, athletes, and staff, there must be a way to record, organize, and display the scores that the judges give to each routine using the hardware already in Gill Coliseum. The Oregon State Gymnastics Team would like new scoring software. The pre-existing software used to display and keep scores has become outdated and has issues displaying on the current hardware. Because of this, it is important for new, custom software to be built that can accurately and elegantly display scores on Gill Coliseum's hardware in a readable manner that is intuitive for fans to understand while providing all the necessary functionality.

# How to run code
Since our project calls for a containerized API based web server, Docker is needed to run the code. You can install Docker [here](https://www.docker.com/products/docker-desktop), but it is important to note that if you are running any version of Windows that isn't enterprise edition you will instead need to download [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/). Once installed, open the `Code` folder and use the command `docker-compose up` this will run the server, to run as a background process use the command `docker-compose up -d`. Once the server is running open your favorite web browser and navigate to the [dashboard](http://localhost:8000/login) or on [docker toolbox](http://192.168.99.100:8000/login). The username is "admin" and the password is "hunter2". Note, if you are using docker toolbox, `localhost:8000` will not work, and instead you will need to grab the ip address given by the virtual machine which can be found underneath Moby Dock (Docker's whale logo). Our current build does not have the print page implemented. We also have many endpoints that can be accessed. These can be found by looking at the created endpoints in the  `api` folder inside the `Code` folder. We recommend an application called [postman](https://www.getpostman.com/) to query the API.

# Using Postman to Test

To test endpoints with Postman you must enter the endpoint and the HTTP method and click on send. Data must be sent using x-www-form-urlencoded format.
> Ex. `GET http://localhost:8000/team/20/meet` or `GET http://192.168.99.100:8000/team/20/meet will return a list of all teams that are participating in 
> the meet where the meet ID = 20

We have made testing collections using postman that can be used to put information into the database and to test each endpoint. To import the collections, copy a link, click the import button on the top left inside postman, and then click "Import From Link" and paste. The endpoint collections work in the following order:

[user](https://www.getpostman.com/collections/907ee91d4b8a480cd003)
[meet](https://www.getpostman.com/collections/e05bb701069ae02f29bd)
[team](https://www.getpostman.com/collections/c94987c1e28eb1be8e7c)
[player](https://www.getpostman.com/collections/e41b099f59f0e34a952a)
[lineup](https://www.getpostman.com/collections/0f108af1690f5aed8075)
[judge](https://www.getpostman.com/collections/14cd4b6e1a5d9ce5af1c)
[score](https://www.getpostman.com/collections/ec25c002dad37ff19870)

## Endpoints

To view the endpoint documentation.
1. Start server using `docker-compose up --build`
2. Wait for server to start.
3. Go to `http://localhost:8000/endpoints.html` or if you are using docker toolbox <br>`http://192.168.99.100:8000/endpoints.html`
