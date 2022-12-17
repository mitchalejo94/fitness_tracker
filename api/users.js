const express = require("express");
const router = express.Router();

// create user function to add to db
const { createUser, getUserByUsername } = require('../db/users');
const { getAllRoutinesByUser } = require('../db/routines')

// require for hasing and checking passwords
const bcrypt = require('bcrypt');
// create our hash function
const SALT_COUNT = 10;

const jwt = require('jsonwebtoken');

router.get("/", async ( req, res ) => {
res.send("TEST STRING")
}
)

// POST /api/users/login
router.post('/login', async (request, response, next) => {
    try {
        // get the user information
        const { username, password } = request.body;

        const ourUserFromDatabase = getUserByUsername(username);

        // compare the typed password to the hashed password from the database
        const hashedPass = await bcrypt.compare(password, SALT_COUNT);
        if (hashedPass != ourUserFromDatabase.password) {
            throw new "You typed the inncorrect password";
        }

        // we still have to do something with the token below
        // response.send(id, username, token)

    } catch (error) {
        console.log('there was an error in router.post/api/users/login: ', error);
        throw error;
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
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
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
        console.log(username, hashedPassword, "USER AND HASH")
        const user = await createUser(username, hashedPassword);
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
router.get('/me', async (request, response, next) => {
    try {
        // get the token from the header and check for a token
        const { token } = request.headers;
        if (!token) {
            throw new "You must be logged in.";
        }
        const { username } = request.body; // ?????

        // we probably want to send them all the routines and activities associated with this user
        const routines = getAllRoutinesByUser(username);

        // add more?
        response.send(routines);

    } catch (error) {
        console.log('there was an error in router.get/api/users/me: ', error);
        throw error;
    }
})

// GET /api/users/:username/routines
router.get('/:username/routines', async (request, response, next) => {
    try {
        const username = request.params;
        console.log('username', username);
        const routines = await getAllRoutinesByUser(username);
        console.log('routines here: ', routines)
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
