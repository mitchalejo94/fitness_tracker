require("dotenv").config()
const express = require("express")
const app = express()

// Setup your Middleware and API Router here

// this will allow us to use tokens in the future
// const jwt = require('jsonwebtoken');
// const { getUserById } = require('../db');
// const { JWT_SECRET } = process.env;

// this is the router that puts us inside the api folder
const apiRouter = require('./api');
app.use('/api', apiRouter);


// error, req, res, next => error handling
apiRouter.use('/', async (error, request, response, next) => {
    response.send({
        name: error.name,
        message: error.message
    }).status(404);
});

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