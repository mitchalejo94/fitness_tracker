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
router.get("/api/activities/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;
  console.log(activityId, "THIS IS ACTIVITY ID LINE 16");
  try {
    const activity = await getActivityById(activityId);
    if (!activity) {
      res.send({
        error: `Activity ${activityId} not found`,
        name: "Activity Not Found",
        message: `Activity ${activityId} not found Error`,
      });
    }

    const routines = await getPublicRoutinesByActivity(activity);
    res.json(routines);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/activities
router.get("/activities", async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();
    res.send({allActivities});
   
  } catch (error) {
      next(error);
    } 
});

// POST /api/activities
router.post("/", async (req, res, next) => {
  try {
    if (!req.user)
      res.status(401).send({
        error: "You must be logged in to perform this action",
        message: "You must be logged in to perform this action",
        name: "Invalid Credentials Error",
      });
    else {
      const { name, description } = req.body;
      const _activity = await getActivityByName(name);
      if (_activity) {
        res.send({
          error: `An activity with name ${name} already exists`,
          name: "ActivityAlreadyExistsError",
          message: `An activity with name ${name} already exists`,
        });
      }
      const activity = await createActivity({ name, description });
      if (activity) res.send({ name, description });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH /api/activities/:activityId
router.patch("/:activityId", async (req, res, next) => {
  try {
    if () {
      const { name, description } = req.body;
      const id = req.params.activityId;
      const updatedActivity = await updateActivity({
        id,
        name,
        description,
      });

      res.send(updatedActivity);
    } else {
      res.send({
        name: "MissingUserError",
        message: "You must be logged in to perform this action",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
