const client = require("./client");
const { createUser,
  getUser,
  getUserById,
  getUserByUsername,} = require("./users.js")

//SMALL CHANGE

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      SELECT * 
      FROM routines
      WHERE id=$1;
      `,
      [id]
    );

    return routine;
  } catch (error) {
    console.log("There was an error getting routine by Id", error);
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(`
    SELECT * 
    FROM routines
    `);

    return rows;
  } catch (error) {
    console.log(
      "There was an error getting routines without activities",
      error
    );
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM routines;
    `);
console.log(rows, "ROWS CONSOLE LOG")
    return rows;
  } catch (error) {
    console.log("There was an error getting all routines:", error);
    throw error();
  }
}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getAllPublicRoutines() {}

async function getPublicRoutinesByActivity({ id }) {}

async function createRoutine({ creatorId, name, goal }) {
  console.log(name,"name of routine")
  try {
    const {
      rows: [routine]
    } = await client.query(
      `
      INSERT INTO routines ("creatorId", name, goal)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [creatorId, name, goal]
    );

    return routine;
  } catch (error) {
    console.log("There was an error creating a routine", error);
    throw error;
  }
}

async function updateRoutine({ id, creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
    UPDATE routines
    name = COALESCE($2, name)
    WHERE id=$1
    RETURNING *;
    `,
      [id, creatorId, isPublic, name, goal]
    );

    return routine;
  } catch (error) {
    console.error("update activity error");
    throw error;
  }
}

async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
