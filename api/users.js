const express = require("express");
const router = express.Router();

// create user function to add to db
const { createUser, getUserByUsername, getUserById } = require('../db/users');
const { getAllRoutinesByUser } = require('../db/routines');

// get our secret files
const { JWT_SECRET } = process.env;

// require for hasing and checking passwords
const bcrypt = require('bcrypt');
// create our hash function
const SALT_COUNT = 10;

// required to build web tokens
const jwt = require('jsonwebtoken');

router.get("/", async ( req, res ) => {
res.send("TEST STRING")
}
)

// POST /api/users/login
router.post('/login', async (request, response, next) => {
    try {
        // get the user information
        console.log('request.body in /login: ', request.body);
        const { username, password } = request.body;
        const { token } = request.headers;
        console.log('token in /login: ', token);
        const newToken = jwt.verify(token, JWT_SECRET)
        console.log('password in /login: ', password);
        // error message if no token
        if (!newToken) {
            next({
                name: "NotAuthenticatedError",
                message: "You must register before logging in."
            })
        }

        // if there is a token, get our user info
        const ourUserFromDatabase = await getUserByUsername(username);

        // compare the typed password to the hashed password from the database
        const hashedPass = await bcrypt.compare(password, SALT_COUNT);
        console.log('hashed pass in /login: ', hashedPass)

        // if the password doesn't match the stored hash password
        if (hashedPass != ourUserFromDatabase.password) {
            throw new "You typed the inncorrect password";
        }

        // we still have to do something with the token below
        response.send(ourUserFromDatabase.id, username, newToken)

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
        console.log("REQUEST BODY", request.body)
        // get the username and password
        // we are assuming (for now) those are inside of an object
        const { username, password } = request.body;
        if (password.length < 8) {
            next({
                name: 'InvalidPasswordError',
                message: 'Your password must be at least 8 characters long.'});
        }
        // hash the password
        // const hashPassword = await bcrypt.hash(password, SALT_COUNT);
        // check our user information against our database
        const _user = await getUserByUsername(username);
        // check if our username already exists. cant have dupes
        if (_user) {
            next({
                name: "UserDuplicated",
                message: "This user already exists. Try again"
            })
        }
        // create a new user in the database
        console.log(username, password, "USER AND HASH")
        const user = await createUser({username, password});
        console.log("user console log", user)
        // create a new token for new user
        const token = jwt.sign({ username: username}, process.env.JWT_SECRET);
        response.send({user, token});
    } catch (error) {
        console.log('there was an error in router.post/api/users/register: ', error);
        next({
            name: "CreateUserError",
            message: "There was an error creating a new user."
        });
    }
})

// GET /api/users/me
router.get('/me', async (req, res, next) =>{
    const prefix = 'Bearer ';
    const auth = req.headers.authorization;
    try {
        if (!auth) {
            res.status(401).send({
            error: "You must be logged in to perform this action",
            message: "You must be logged in to perform this action",
            name: "InvalidCredentialsError",
            })
        } else if (auth.startsWith(prefix)) {
            const token = auth.slice(prefix.length)
            const { id } = jwt.verify(token, JWT_SECRET);
            req.user = await getUserById(id);
            res.send(req.user)
        }
    } catch (error) {
        next (error);
    }  
}); 


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
        throw error;
    }
})

module.exports = router;
