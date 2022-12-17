require("dotenv").config()
const express = require("express")
const app = express()
const apiRouter = require('./api');


// Setup your Middleware and API Router here

// this will allow us to use tokens in the future
const jwt = require('jsonwebtoken');
const { getUserById } = require('./db');
const { JWT_SECRET } = process.env;

apiRouter.use(async(req, res, next) =>{
    const prefix = 'Bearer';
    const auth = req.header('Authorization');

    if(!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try{
            const {id} = jwt.verify(token, JWT_SECRET);

            if(id) {
                req.user = await getUserById(id);
                next();
            }
        }catch ({name, message}) {
            next({name, message});
        }
    }else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token muxt start with ${prefix}`
        });
    }
});


const morgan = require("morgan");
app.use(morgan("dev"));

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())


app.use(express.json());


// this is the router that puts us inside the api folder

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