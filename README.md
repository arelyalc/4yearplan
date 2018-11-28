# Genproject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5 and express 4. The main two branches that host the project code are `dev` and `server`.

## Back-end server

For the back-end code, switch to branch `server`, make sure you have the latest version of node js installed, and run `node server.js`. If all goes well, the console will display "Magic happens on port 3000". Mongodb and express back end debug messages will also appear in this console.  

## Front-end website

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files, and will automatically send requests to the back end server. Note: The back-end server must be running for theapp to work.

## Future work

In the future, we hope to transition to a more integrated deployment process, in which both branches are integrated into a production level build that is hosted on an AWS instance and public domain.

## Back-end code structure

server.js contains all the middleware used by the server itself, as well as the code to start running the server on port 3000. 
routes.js contains the actual api routes that are called by the front-end, and that access the mongodb instance.
db.js contains the code to connect to the remote mongodb instance.
Each schema object has its own exported model file that is used in the routes. (ex: user.js, plan.js)

## Front-end code structure

The angular app is split into modules according to feature areas. These include home-page, llogin, registration, users/dashboard, users/profile-settings, and the main app itself. Client side routing with route protection was used to connect these components together. The main landing screen of the app can be found in the dashboard component, which contains te heart of the plan generation algorithm and much more. 
