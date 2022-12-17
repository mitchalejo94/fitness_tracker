const express = require('express');
const router = express.Router();
const {
    getRoutineActivityById,
    addActivityToRoutine,
    getRoutineActivitiesByRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
} = require ("../db/routine_activities") 

// PATCH /api/routine_activities/:routineActivityId

// DELETE /api/routine_activities/:routineActivityId
/* router.delete("/:routineActivityId", async (req, res, next) => {
    try {
        const { getRoutineActivityById } = req.params;
        const { destroyRoutineActivity } 

    }
})

*/
module.exports = router;
