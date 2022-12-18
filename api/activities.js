const express = require("express");
const router = express.Router();
const {
  getAllActivities,
  createActivity,
  getActivityById,
  updateActivity,
  getActivityByName,
} = require("../db/activities");
const { getPublicRoutinesByActivity } = require("../db/routines");

// GET /api/activities/:activityId/routines
router.get("/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;
  try {
    const activity = await getActivityById(activityId);
    if (!activity) {
      res.send({
        error: `Activity ${activityId} not found`,
        name: "ActivityNotFoundError",
        message: `Activity ${activityId} not found`,
      });
    }

    const routines = await getPublicRoutinesByActivity(activity);
    res.json(routines);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// router.get('/:activityId/routines', async (req, res, next) => {
//   try {
//       const id = req.params.activityId;
//       const routines = await getPublicRoutinesByActivity({ id });
//       console.log(id, "look here")
//       console.log(routines, "also check here")
//       res.send(routines);        
//   } catch (error) {
//       next (error);
//   }
// });

// GET /api/activities
router.get("/", async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();
    res.send(allActivities);
    
  } catch (error) {
      next(error);
    } 
});

// POST /api/activities
router.post('/', async(req, res, next) => {
  try {
    const { name, description } = req.body;
    const existingActivity = await getActivityByName(name);
      if (existingActivity) {
        next({
          name: 'ActivityExistsError',
          message: `An activity with name ${name} already exists`
        })
      } else {
        const createdActivity = await createActivity({ name, description });
          if (createdActivity) {
            res.send(createdActivity)
          }
      } 
  } catch (error) {
    next(error);
  }
})

// PATCH /api/activities/:activityId
router.patch('/:activityId', async(req, res, next) => {
  try {
  const { name, description } = req.body;
  const { activityId } = req.params;
  const existingActivity = await getActivityById(activityId);
  const namedActivity = await getActivityByName(name);

    if (!existingActivity) {
      next({
        name: 'ActivityNotFoundError',
        message: `Activity ${activityId} not found`
      })

    } else if (namedActivity) {
          next({
            name: 'ActivityExistsError',
            message: `An activity with name ${name} already exists`
        })
      } else {
        const updatedActivity = await updateActivity({id: activityId, name, description});
          res.send(updatedActivity);
      }
  } catch (error) {
    next (error);
  }
});

module.exports = router;
