const express = require('express');
const router = express.Router();

// create user function to add to db
const { createUser } = require('../db/users');

// require for hasing and checking passwords
const bcrypt = require('bcrypt');
// create our hash function
const SALT_COUNT = 10;

// POST /api/users/login
router.post('/api/users/login', async (request, response, next) => {
    try {
        // get the user information
        const userInfo = request.body;


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
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        
        const newUser = createUser(username, hashedPassword);

        /*
        still not sure how to check for duplicate usernames???
        */

        return newUser;
    } catch (error) {
        console.log('there was an error in router.post/api/users/register: ', error);
        throw error;
    }
})

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
