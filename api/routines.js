//TEST
const express = require("express");
const {
  getRoutineById,
  createRoutine,
  updateRoutine,
  destroyRoutine,
  getAllPublicRoutines,
} = require("../db/routines");
const {
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
} = require("../db/routine_activities");
const router = express.Router();

const { jwt } = require('jsonwebtoken')

// GET /api/routines
router.get("/", async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();
    res.json(routines);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//TEST
// POST /api/routines
router.post("/", async (req, res, next) => {
  console.log('request body: ', req.body)
  console.log('request headers: ', req.headers)
  console.log('request user: ', req.user)

  // DO WE HAVE TO GET THE TOKEN FROM THE HEADERS TO CHECK IF SOMEONE IS LOGGED IN?

  const token = req.headers.authorization.slice(7);
  console.log('token', token)
  const signedIn = jwt.verify(token);
  console.log('signed in? ', signedIn)
  // if (!req.user)
  //   res.status(401).send({
  //     error: "You must be logged in to perform this action",
  //     message: "You must be logged in to perform this action",
  //     name: "InvalidCredentialsError",
  //   });

  try {
    const { isPublic, name, goal } = req.body;
    const creatorId = req.user.id;
    console.log('creator id? : ', creatorId)
    const routineData = { creatorId, isPublic, name, goal };
    const newRoutine = await createRoutine(routineData);
    console.log('new routine? : ', newRoutine)
    res.json(newRoutine);
    res.send(newRoutine)
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH /api/routines/:routineId

router.patch("/:routineId", async (req, res, next) => {
  if (!req.user)
    res.status(401).send({
      error: "You must be logged in to perform this action",
      message: "You must be logged in to perform this action",
      name: "InvalidCredentialsError",
    });
  const { routineId } = req.params;
  const { isPublic, name, goal } = req.body;

  try {
    const original = await getRoutineById(routineId);
    if (original && original.creatorId === req.user.id) {
      const updatedRoutine = await updateRoutine({
        id: routineId,
        isPublic,
        name,
        goal,
      });
      res.send(updatedRoutine);
    } else {
      res.status(403).send({
        error: `User ${req.user.username} is not allowed to update ${original.name}`,
        message: `User ${req.user.username} is not allowed to update ${original.name}`,
        name: "UnathorizedActionError",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE /api/routines/:routineId
router.delete("/:routineId", async (req, res, next) => {
  const { routineId } = req.params;

  try {
    const routine = await getRoutineById(routineId);

    if (routine && routine.creatorId === req.user.id) {
      const deletedRoutine = await destroyRoutine(routineId);
      res.send(deletedRoutine);
    } else {
      res.status(403).send({
        error: `User ${req.user.username} is not allowed to delete ${routine.name}`,
        message: `User ${req.user.username} is not allowed to delete ${routine.name}`,
        name: "UnauthorizedActionError",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/routines/:routineId/activities
//-------passes second test
// router.post('/:routineId/activities', async(req, res, next) => {
//   const routineId = req.params.routineId;
//   const {activityId, count, duration} = req.body
  
//   try {
//       const routineActivities = await getRoutineById({ id: routineId, });
      
//       if (routineActivities.creatorId === req.user.id) {
//           const addedActivity = await addActivityToRoutine({ routineId, activityId, count, duration });
//           res.send(addedActivity);
//       } else {
//           res.status(403);
//           next({
//               error: "error posting routine_activities",
//               message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
//               name: "DuplicateRoutineActivityError"
//           })
//       }
//   } catch ({name, message}) {
//       res.send({
//           error: "error posting routine_activities",
//           message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
//           name: "DuplicateRoutineActivityError"
//       })
//   }
// })



//-------passes first test
router.post('/:routineId/activities', async(req, res, next) => {
  const routineId = req.params.routineId;
  const {activityId, count, duration} = req.body
  try {
    const routineActivities = await getRoutineActivitiesByRoutine({
      id: routineId,
    });
    const filteredActivities = routineActivities.filter((routine) => {
      return activityId === routine.activityId;
    });

    if (filteredActivities.length > 0) {
      res.status(403);
      next({
        name: "ActivityExists",
        message: "This activity already exists",
      });
    } else {
      const addedActivity = await addActivityToRoutine({
        routineId,
        activityId,
        count,
        duration,
      });
      res.send(addedActivity);
    }
  } catch ({ name, message }) {
    res.send ({
      error: "error posting routine_activities",
      message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
      name: "DuplicateRoutineActivityError"
    })
  }
})

module.exports = router;
