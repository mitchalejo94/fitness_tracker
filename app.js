require("dotenv").config()
const express = require("express")
const app = express.Router()

// Setup your Middleware and API Router here

// this is the router that puts us inside the api folder
const apiRouter = require('./api');
app.use('/api', apiRouter);

// this router gets us to the /db folder


module.exports = app;

/*
var express = require('express');
var app = express();
var PORT = 3000;
  
// This middleware will not allow the
// request to go beyond it
app.use(function (req, res, next) {
    console.log("Middleware called")
    next();
});
    
app.get('/user', function (req, res) {
    console.log("/user request called");
    res.send('Welcome to GeeksforGeeks');
});
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
*/