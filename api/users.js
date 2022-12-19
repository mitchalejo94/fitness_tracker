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
// const SALT_COUNT = 10;

// required to build web tokens
const jwt = require('jsonwebtoken');

router.get("/", async ( req, res ) => {
res.send("TEST STRING")
}
)

// POST /api/users/login
router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Missing username or password",
      });
    }
  
    try {
      const user = await getUserByUsername(username);
      bcrypt.compare(password, user.password, (error) => {
        if (error) {
          next({
            name: "UserAuthenticationError",
            message: "username or password was incorrect",
          });
        } else {
          const token = jwt.sign(
            {
              id: user.id,
              username,
            },
            JWT_SECRET,
            { expiresIn: "1w" }
          );
  
          res.json({
            message: "you're logged in!",
            token,
            user: { id: user.id, username },
          });
        }
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// only passing last test
// router.post('/login', async (req, res, next) => {
//     const { username, password } = req.body;
//     try {
//         const user = await getUserByUsername(username);
//         const hashedPassword = user.password;
//         const passwordsMatch = await bcrypt.compare(password, hashedPassword);

//         if (!username || !password) {
//             next ({
//                 name: 'MissingCredentialsError',
//                 message: 'Please supply both a username and password'
//             });
//         };

//         if (user && passwordsMatch) {
//             const token = jwt.sign(user, JWT_SECRET);
//             res.send({ token });
//         } else {
//             next({
//                 name: 'IncorrectCredentialError',
//                 message: 'Username or password is incorrect'
//             });
//         }    
//     } catch (error) {
//         next(error);
//     }
// });



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
