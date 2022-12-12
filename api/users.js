const express = require('express');
const router = express.Router();

// create user function to add to db
const { createUser, getUserByUsername } = require('../db/users');
const { getAllRoutinesByUser } = require('../db/routines')

// require for hasing and checking passwords
const bcrypt = require('bcrypt');
// create our hash function
const SALT_COUNT = 10;

// POST /api/users/login
router.post('/api/users/login', async (request, response, next) => {
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
router.post('/api/users/register', async (request, response, next) => {
    try {

        // get the username and password
        // we are assuming (for now) those are inside of an object
        const { username, password } = request.body;
        if (password.length < 8) {
            throw new "Your password is too short";
        } 
        // hash the password
        const hashedPassword = await bcrypt.compare(password, SALT_COUNT);
        
        const newUser = createUser(username, hashedPassword);

        /*
        still not sure how to check for duplicate usernames???
        */

        response.send(newUser);
    } catch (error) {
        console.log('there was an error in router.post/api/users/register: ', error);
        throw error;
    }
})

// GET /api/users/me
router.get('/api/users/me', async (request, response, next) => {
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
router.get('/api/users/:username/routines', async (request, response, next) => {
    try {
        const username = request.params;
        const routines = getAllRoutinesByUser(username);

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
