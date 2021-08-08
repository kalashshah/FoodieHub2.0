# FoodieHub2.0
FoodieHub
https://rocky-headland-51556.herokuapp.com/

# Error 417
We have created a basic food application where we have the Sign Up, Login and Home pages. We have used Node, MongoDB, HTML, CSS and Javascript to accomplish the tasks. 
App.js file has Node requests to store accounts in the local mongo database. The password is stored after encryption to improve data privacy. Users can register themselves on the signup page and then login using the registered account. Users can also visit the Home page to look at the dishes available. 
The views are made using ejs partials to prevent code duplication and separation of components.

To run it locally use the following commands in terminal you must be in the the directory where app.js is located
Also if we have a local Mongodb application use "mongod" command before running the app

npm install
nodemon app.js
