const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  // putting a new user into the database
  try {
    const {rows: newUser} = await client.query(`
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
    ;
    `, [username, password]);
    // console.log('new user here', newUser.rows)
    return newUser;
  } catch (error) {
    console.log('there was an error creating a new user in users.js: ', error);
    throw (error);
  }

}

async function getUser({ username, password }) {

}

async function getUserById(userId) {

}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
