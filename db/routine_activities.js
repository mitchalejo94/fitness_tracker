const client = require('./client')

async function getRoutineActivityById(id){
  try {
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
    
}

async function getRoutineActivitiesByRoutine({id}) {
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
