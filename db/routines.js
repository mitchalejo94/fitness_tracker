const client = require("./client");
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require("./users.js");

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

    return rows;
  } catch (error) {
    console.log("There was an error getting all routines:", error);
    throw error();
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const { id } = await getUserByUsername(username);
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName" 
    FROM routines 
    INNER JOIN users ON routines."creatorId"=users.id 
    WHERE "creatorId"=${id};
    `);

    const routinesWithActivities = await Promise.all(
      routines.map(async (routine) => {
        const { rows: activities } = await client.query(`
        SELECT routine_activities.*, routine_activities.id as "routineActivityId", activities.* 
        FROM routine_activities 
        INNER JOIN activities ON routine_activities."activityId"=activities.id 
        WHERE routine_activities."routineId"=${routine.id};
        `);
        return { ...routine, activities };
      })
    );

    return routinesWithActivities;
  } catch (error) {
    console.log("There was an error in getting all routines by user", error);
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const { id } = await getUserByUsername(username);
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName" 
    FROM routines 
    INNER JOIN users ON routines."creatorId"=users.id 
    WHERE "creatorId"=${id} AND "isPublic"=true;
      
    `);

    const routinesWithActivities = await Promise.all(
      routines.map(async (routine) => {
        const { rows: activities } = await client.query(`
        SELECT routine_activities.*, routine_activities.id as "routineActivityId", activities.* 
        FROM routine_activities 
        INNER JOIN activities ON routine_activities."activityId"=activities.id 
        WHERE routine_activities."routineId"=${routine.id};
        `);
        return { ...routine, activities };
      })
    );

    return routinesWithActivities;
  } catch (error) {
    console.log("There was an error in getting public routines by user", error);
    throw error;
  }
}

async function getAllPublicRoutines(isPublic) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
    SELECT * 
    FROM routines
    WHERE "isPublic"=TRUE;
    `,
      [isPublic]
    );

    return routine;
  } catch (error) {
    console.log("There was an error getting routine by Id", error);
    throw error;
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const publicRoutines = (await getAllPublicRoutines()).filter((routine) => {
      for (let activity of routine.activities) {
        if (activity.activityId === id) return true;
      }
    });

    return publicRoutines;
  } catch (error) {
    console.log(
      "There was an error getting public routines by activity",
      error
    );
    throw error;
  }
}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      INSERT INTO routines ("creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
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

async function destroyRoutine(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        DELETE FROM ROUTINES
        WHERE id=$1
        `,
      [id]
    );

    return routine;
  } catch (error) {
    console.log("unable to delete routine", error);
    throw error;
  }
}

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
