# 4 Year Plan Generator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5 and express 4. The main two branches that host the project code are `dev` (contains the final front end code) and `server` (contains the final back end code).


## Installation and Usage

[Installation Instructions](https://drive.google.com/open?id=1emj8KUSUy5GcY5MhTDPzHxre0sNCH9nsWooYc9h7HjM)</br>
[Admin Instructions](https://drive.google.com/open?id=1DZMZWr-f1_TPr6iophWI2Sba5VFD2-IM3diHNdMLpFk)</br>
[App Usage Instructions](https://drive.google.com/open?id=1xnmkN7tqGU8AoMYRax8qcDsTQPzvdhPWFWxo0h7_Xxs)

## Front-end code structure

The angular app is split into modules according to feature areas. These include home-page, login, registration, users/dashboard, users/profile-settings, and the main app itself. Client side routing with route protection was used to connect these components together. The main landing screen of the app can be found in the dashboard component, which contains the heart of the plan generation algorithm and much more. 


## Back-end code structure

`server.js` contains all the middleware used by the server itself, as well as the code to start running the server on port 3000. 

`routes.js` contains the actual api routes that are called by the front-end, and that access the mongodb instance.
`db.js` contains the code to connect to the remote mongodb instance.

Each schema object has its own exported model file that is used in the routes. (ex: `user.js`, `plan.js`)

## Future work

In the future, we hope to transition to a more integrated deployment process, in which both branches are integrated into a production level build that is hosted on an AWS instance and public domain.




