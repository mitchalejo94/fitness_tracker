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
  // getting 1 user from the database
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
    return fetchUser;
  } catch (error) {
    console.log('there was an error getting a user in users/getUser: ', error);
    throw (error);
  }
}

async function getUserById(userId) {
  // getting a user by their username
  try {
    const {rows: [getUserById]} = await client.query(`
    SELECT * FROM users
    WHERE id=$1
    ;
    `, [userId]);
    console.log('we have gotten a user by their id: ', getUserById);
    return getUserById;
  } catch (error) {
    console.log('there was an error in getUserById: ', error);
    throw error;
  }
}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
