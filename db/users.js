const client = require("./client");

// require our hashing function
const bcrypt = require('bcrypt')

// create our hash function
const SALT_COUNT = 10;

// database functions

// user functions
async function createUser({ username, password }) {
  // putting a new user into the database
  if (!username || !password) {
    throw new ("You must include both a username and a password");
  }

  // hashed password
  const hashedPass = await bcrypt.hash(password, SALT_COUNT);
  // console.log('HASHING NOW: ', hashedPass);

  // console.log(typeof username);
  // console.log(typeof hashedPass);
  try {
    const {rows: [newUser]} = await client.query(`
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
    ;
    `, [username, hashedPass]);
    // console.log('new user here', newUser)
    delete newUser.password;
    return newUser;
  } catch (error) {
    console.log('there was an error creating a new user in users.js: ', error);
    throw (error);
  }
}

// getting 1 user from the database
async function getUser({ username, password }) {
  /*

    WE MAY HAVE TO CHANGE THIS TO INCLUDE THE PASSWORD FIELD

  */
  try {
    const {rows: [fetchUser]} = await client.query(`
    SELECT * FROM users
    WHERE username=$1
    ;
    `, [username]);
    // console.log('have fetched a user: ', fetchUser);
    

    if (!fetchUser) {
      throw new ("Password or username did not match");
    } else {
      const passwordcheck = await bcrypt.compare(password, fetchUser.password);
      if (passwordcheck === true) {
        delete fetchUser.password;
        return fetchUser;
      }
    }
  } catch (error) {
    console.log('there was an error getting a user in users/getUser: ', error);
    throw (error);
  }
};

async function getUserById(userId) {
  // getting a user by their username
  try {
    const {rows: [getUserById]} = await client.query(`
    SELECT * FROM users
    WHERE id=$1
    ;
    `, [userId]);
    // console.log('we have gotten a user by their id: ', getUserById);
    delete getUserById.password;
    return getUserById;
  } catch (error) {
    console.log('there was an error in getUserById: ', error);
    throw error;
  }
};

async function getUserByUsername(userName) {
  // getting a user by their username
  try {
    const {rows: [fetchUserByUsername]} = await client.query(`
    SELECT * FROM users
    WHERE username=$1;
    `, [userName]);
    console.log('we have gotten a user by username: ', fetchUserByUsername);
    return fetchUserByUsername;
  } catch (error) {
    console.log('there was an error in getUserByUsername: ', error);
    throw (error);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
