const express = require('express');
const router = express.Router();
const {getRoutineById} = require("../db/routines")
const {
    getRoutineActivityById,
    updateRoutineActivity,
    destroyRoutineActivity,
} = require ("../db/routine_activities") 
//TEST

// PATCH /api/routine_activities/:routineActivityId
router.patch("/:routineActivityId", async (req, res, next) => {
    const { count, duration } = req.body;
    const { routineActivityId } = req.params;
    const _routineActivity = await getRoutineActivityById(routineActivityId);
    const { creatorId, name } = await getRoutineById(_routineActivity.routineId);
    if (creatorId !== req.user.id) {
      res.status(403).send({
        error: `User ${req.user.username} is not allowed to update ${name}`,
        message: `User ${req.user.username} is not allowed to update ${name}`,
        name: "UnauthorizedActionError",
      });
    }
    try {
      const updatedRoutineActivity = await updateRoutineActivity({
        id: routineActivityId,
        count,
        duration,
      });
      res.send(updatedRoutineActivity);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

// DELETE /api/routine_activities/:routineActivityId
router.delete("/:routineActivityId", async (req, res, next) => {
    const { routineActivityId } = req.params;
  
    try {
      const _routineActivity = await getRoutineActivityById(routineActivityId);
      const { creatorId, name } = await getRoutineById(
        _routineActivity.routineId
      );
  
      if (_routineActivity && creatorId === req.user.id) {
        const deletedRoutineActivity = await destroyRoutineActivity(
          routineActivityId
        );
        res.send(deletedRoutineActivity);
      } else {
        res.status(403).send({
          error: `User ${req.user.username} is not allowed to delete ${name}`,
          message: `User ${req.user.username} is not allowed to delete ${name}`,
          name: "UnauthorizedActionError",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

module.exports = router;
