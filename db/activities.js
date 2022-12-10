const client = require("./client");

// database functions
async function getAllActivities() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM activities;
    `);

    return rows;
  } catch (error) {
    console.log("There was an error getting all activities:", error);
    throw error();
  }
}

async function getActivityById(id) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
    SELECT *
    FROM activities
    WHERE id=$1;
    `,
      [id]
    );

    return activity;
  } catch (error) {
    console.log("There was an error geting activity by Id", error);
    throw error;
  }
}

async function getActivityByName(name) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
    SELECT *
    FROM activities
    WHERE name = $1;
    `,
      [name]
    );

    return activity;
  } catch (error) {
    console.log("There was an error in getting activity by name", error);
    throw error;
  }
}

// select and return an array of all activities

//may need to change this function
// async function attachActivitiesToRoutines(routines) {
//   try {
//     const { rows: activities } = await client.query(`
//         SELECT activities.*, routine_activities.*
//         FROM activities
//         JOIN routine_activities ON activities.id=routine_activities."activityId";
//     `);
//     routines.forEach((routine) => {
//       const filteredActivities = activities.filter(
//         (activity) => routine.id === activity.routineId
//       );
//       routine.activities = filteredActivities;
//     });
//     return routines;
//   } catch (error) {
//     console.error("attach activities to routines error", error);
//     throw error;
//   }
// }

// return the new activity
async function createActivity({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      INSERT INTO activities (name, description)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [name, description]
    );
    return activity;
  } catch (error) {
    console.log("There was an error creating an activity", error);
    throw error;
  }
}

// don't try to update the id
// do update the name and description
// return the updated activity

//updateActivity is not passing tests
async function updateActivity({ id, name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
      UPDATE activities
      SET
      name = COALESCE($2, name),
      description = COALESCE($3, description)
      WHERE id=$1
      RETURNING *;
    `,
      [id, name, description]
    );

    return activity;
  } catch (error) {
    console.error("update activity error");
    throw error;
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  // attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
