const express = require("express");
const router = express.Router();

// create user function to add to db
const { createUser, getUserByUsername } = require('../db/users');
const { getAllRoutinesByUser } = require('../db/routines');

// get our secret files
const { JWT_SECRET } = process.env;

// require for hasing and checking passwords
const bcrypt = require('bcrypt');
// create our hash function
// const SALT_COUNT = 10;

// required to build web tokens
const jwt = require('jsonwebtoken');

router.get("/", async ( req, res ) => {
res.send("TEST STRING")
});

// POST /api/users/login
router.post('/login', async (request, response, next) => {
    try {
    
        const { token } = request.headers; 

        // console.log('request.body in /login: ', request.body);
        const { username, password } = request.body;

        if (!username || !password ){
            next({
                name: "LoginError",
                message: "You must type a username and password"
            })
        }

        const ourUserFromDatabase = await getUserByUsername(username);
        console.log('ouruser from database : ', ourUserFromDatabase)
        // compare the typed password to the hashed password from the database
        const hashedPass = await bcrypt.compareSync(password, ourUserFromDatabase.password);
        console.log('hashed pass in /login: ', hashedPass)

        // if the password doesn't match the stored hash password
        if (hashedPass == false) {
            next({ 
                name: "AuthorizationError",
                message: "You typed the inncorrect password"
            }) 
        } 

        const newToken = await jwt.sign({ username: ourUserFromDatabase.username, id: ourUserFromDatabase.id }, JWT_SECRET,);

        console.log('did we get a new token? ', newToken);

        // we still have to do something with the token below
        response.send({
            message: "you're logged in!",
            user: {
                username: ourUserFromDatabase.username,
                id: ourUserFromDatabase.id
            },
            token: newToken
        })

    } catch (error) {
        console.log('there was an error in router.post/api/users/login: ', error);
        next({
            name: "LoginError",
            message: "There was an error logging in."
        })
    }
});

// POST /api/users/register
router.post('/register', async (request, response, next) => {
    try {
        // console.log("REQUEST BODY", request.body)
        // get the username and password
        // we are assuming (for now) those are inside of an object
        const { username, password } = request.body;
        if (password.length < 8) {
            next({
                name: `Password Too Short!`,
                message: "Password Too Short!"
            });
        }
        // hash the password
        // const hashPassword = await bcrypt.hash(password, SALT_COUNT);
        // check our user information against our database
        const _user = await getUserByUsername(username);
        // check if our username already exists. cant have dupes
        if (_user) {
            next({
                name: `User ${username} is already taken.`,
                message: `User ${username} is already taken.`,
            });
        }
        // create a new user in the database
        // console.log(username, password, "USER AND HASH")
        const user = await createUser({username, password});
        // console.log("user console log", user)
        // create a new token for new user
        const token = jwt.sign({ username: username}, process.env.JWT_SECRET);
        response.send({message: "Thank you for signing up!", user, token});
    } catch (error) {
        // console.log('there was an error in router.post/api/users/register: ', error);
        next({
            name: "CreateUserError",
            message: "There was an error creating a new user."
        });
    }
})

// GET /api/users/me
router.get('/me', async (request, response, next) => {
    try {
        // get the token from the header and check for a token
        const { token } = request.headers;
        console.log('token in /me: ', token)
        if (!token) {
            next({
                name: "LogInError",
                message: "You must be logged in to perform this function."
            });
        }

        const { username } = request.body; // ?????
        console.log('username in GET/me: ', username)
        // we probably want to send them all the routines and activities associated with this user
        const routines = await getAllRoutinesByUser(username);
        console.log('routines in GET/me: ', routines)
        // add more?
        response.send({
            routines,
            username,

        });

    } catch (error) {
        console.log('there was an error in router.get/api/users/me: ', error);
        next({
            name: "FetchRoutinesError",
            message: "There was an error fetching all user routines."
        });
    }
})

// GET /api/users/:username/routines
router.get('/:username/routines', async (request, response, next) => {
    try {
        const username = request.params;
        // console.log('username', username);
        const routines = await getAllRoutinesByUser(username);
        // console.log('routines here: ', routines)
        // this might check for public-ness?
        routines.forEach((routine) => {
            if (routines.isPublic === true) {
                return routine;
            }
        })
        response.send(routines);
    } catch (error) {
        console.log('there was an error in router.get/api/users/username/routines: ', error);
        next({
            name: "RoutinesError",
            message: "There was an error fetching all routines for a user."
        }).status(401)
    }
})

module.exports = router;
