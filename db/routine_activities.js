const client = require('./client')

const { getRoutineById } = require('./routines')

async function getRoutineActivityById(id){
  try {

    // get a routine from the id
      // select all routine_activities where id = routineId 
        //
    const {rows: [routineActivity]} = await client.query(`
    SELECT * FROM routine_activities
    WHERE id=$1;
    `, [id]);

    console.log('here we have a routine by Id: ', routineActivity);
    return routineActivity;
  } catch (error) {
    console.log('there was an error in getRoutineActivityById: ', error);
    throw error;
  }
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
    try {
      const {rows: activity} = await client.query(`
      INSERT INTO routine_activites (routine_id, activity_id, duration, count)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      ;
      `, [routineId, activityId, count, duration]);
      console.log('this is the activity we have added: ', activity);
      return activity;
    } catch (error) {
      console.log('there was an error in addActivityToRoutine: ', error);
      throw error;
    }
}

async function getRoutineActivitiesByRoutine({id}) {
  try {

    const {rows: routineArray} = await client.query(`
    SELECT * FROM routine_activities
    WHERE "routineId"=$1;
    `, [id]);

    console.log('is this an array? : ', routineArray);

    return routineArray;

  } catch (error) {
    console.log('there was an error in getRoutineActivitiesByRoutine: ', error);
    throw error;
  }

}

async function updateRoutineActivity ({id, ...fields}) {
}

async function destroyRoutineActivity(id) {
}

async function canEditRoutineActivity(routineActivityId, userId) {
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
