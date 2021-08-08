//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

// using bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/customerdb", {useNewUrlParser: true});

const customerSchema = new mongoose.Schema ({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    password: String,
    confirmPass: String
});

const Customer = new mongoose.model("Customer", customerSchema);

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/register', function(req, res) {
    res.render('register');
});



app.post("/register", function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            const newCustomer = new Customer({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hash
        });
        newCustomer.save(function(err){
            if(err) {
                console.log(err);
            } else {
                console.log("Registered Successfully");
                res.render("dashboard");
            }
        });
   });
});

app.post('/login', function(req, res) {
   const email = req.body.email;
    const password = req.body.password;

   Customer.findOne({email: email}, function(err, foundCustomer) {
    if(err) {
        console.log(err);
    } else {
        if(foundCustomer) {
            bcrypt.compare(password, foundCustomer.password, function(_err, result) {
                if(result === true){
                    console.log("Customer Found");
                    res.render("dashboard");
                }
                if(_err) {
                    console.log(_err);
                }
            });
        }
    }
   });
});

app.listen(process.env.PORT || 3000 , function(req, res) {
    console.log('Listening to port 3000');
});