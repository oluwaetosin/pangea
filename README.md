<div id="top"></div>




<!-- PROJECT SHIELDS -->
 



<!-- PROJECT LOGO -->
<br />
<div align="center">
   

  <h3 align="center">Take home assignment</h3>

   
</div>





<!-- ABOUT THE PROJECT -->




<!-- GETTING STARTED -->
## Getting Started

1. clone the repo to your local machine.
2. ensure the docker and docker-compose is installed on the computer
3. run the start.bash script in the root folder (this shell script will run docker-compose up)
4. this will start three services:
    publisher on port 8000 [http://publisher:8000]
    subscriber on port 9000 [http://subscriber:9000]
    mysql on port 3306
5. to connect to the subscriber service use http://subscriber:9000 and not the localhost 
   hence for the subscriber service to receiver publish notification from the publisher
   it must be subscribed to using http://subscriber:9000 as the url
6. Note that this architecture could be improved by pushing the request to a job queue but I settled for a realtime handler because the task appear to indicate a synchronous approach



 
 