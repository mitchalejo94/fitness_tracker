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
  if (!req.user)
    res.status(403).send({
      error: "You must be logged in to perform this action",
      message: "You must be logged in to perform this action",
      name: "InvalidCredentialsError",
    });

  try {
    const { isPublic, name, goal } = req.body;
    const creatorId = req.user.id;
    const routineData = { creatorId, isPublic, name, goal };
    const newRoutine = await createRoutine(routineData);
    res.json(newRoutine);
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

//no tests passing
// router.delete('/:routineId', async(req, res, next) => {
//   try {
//       const {routineId} = req.params
//       const _routine = await getRoutineById(routineId)
//       console.log('look here', req.user)
//       if(!req.user) {
//           next({
//               error: 'not logged in',
//               message: "UnauthorizedError()",
//               name: 'must be logged in'
//           })
//       } else if(_routine.creatorId !== req.user.id) {
//           next({
//               status: 403,
//               error: 'user is not owner',
//               message: "UnauthorizedDeleteError(req.user.username, _routine.name)",
//               name: 'Cannot delete routines that you did not create'
//           })
//       } else {
//           const deletedRoutine = await destroyRoutine(routineId)

//           res.send(deletedRoutine)
//       }
      
//   } catch(error) {
//       next(error)
//   }
// })

//passes first test
// router.delete("/:routineId", async (req, res, next) => {
 
//   try {
//     const { routineId } = req.params;
//     const routine = await getRoutineById(routineId);
//     const deletedRoutine = await destroyRoutine(routineId);
//     // console.log('look here', routine.creatorId)
//     // console.log('answer', req.user)

//     if (!req.user) {
      
//       res.send(deletedRoutine);
//     } else {
//       res.status(403).send({
//         error: `User is not allowed to delete ${routine.name}`,
//         message: `User is not allowed to delete ${routine.name}`,
//         name: "UnauthorizedActionError",
//       });
//     }
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

//No tests passing
// router.delete("/:routineId", async (req, res, next) => {
 
//   try {
//     const { routineId } = req.params;
//     const routine = await getRoutineById(routineId);
//     const deletedRoutine = await destroyRoutine(routineId);
//     // console.log('look here', routine.creatorId)

//     if (!req.user) {
//       res.status(403).send({
//         error: `User is not allowed to delete ${routine.name}`,
//         message: `User is not allowed to delete ${routine.name}`,
//         name: "UnauthorizedActionError",
//       });
      
//     } else {
//       res.send(deletedRoutine);
//     }
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

//passes first test
// ✕ Hard deletes a routine. Makes sure to delete all the routineActivities whose routine is the one being deleted
// ✕ returns a 403 when the user deletes a routine that isn't theirs 

// router.delete("/:routineId", async (req, res, next) => {
//   try {
//     const { routineId } = req.params;
//     const deleteRoutine = await destroyRoutine(routineId);
//     res.send(deleteRoutine);
//   } catch (error) {
//     next(error);
//   }
// })

// const requireUser = (req,res,next)=>{
//   if(!req.user){
//     res.statusCode = 403;
//     next({
//       name: 'MissingUserError',
//       message: 'You must be logged in'
//     })
//   }
//   next()
// }

const requireUser = (req, res,next)=>{
  if(!req.user){
    res.status(403)
    res.send({
      error:"no user",
      name: "MissingUserError",
      message: "You must be logged in"
    })
  }
  next()
}


router.delete("/:routineId", requireUser, async (req, res, next) => {
  try {
    const routineId = req.params.routineId
    const {name}= req.body
    const routine = await getRoutineById(routineId)

    if(routine.creatorId !== req.user.id){
      res.statusCode = 403
      next({
        name: "UnauthorizedUserError",
          message: `User ${name} is not allowed to delete On ${name}`
      })
    }else {
      let deletedRoutine = await destroyRoutine (routineId);
      if (!deletedRoutine){
        res.send({success: true, ...deletedRoutine})
      }
    }

  }catch (error){
    next(error)
  }

})


// POST /api/routines/:routineId/activities
router.post('/:routineId/activities', async(req, res, next) => {
  const routineId = req.params.routineId;
  const {activityId, count, duration} = req.body
  // console.log('this is req.body: ', req.body)
  // console.log('headers? : ', req.headers)
  // console.log('just the whole req: ', req);
  // const token = req.headers.authorization.slice(7);
  // console.log('token: ', token)
  // const decoded = jwt.verify(token, JWT_SECRET);
  // console.log('decoded? : ', decoded)

  try {
      const routine = await getRoutineById(routineId);
      // console.log('routinesActivities in router/post: ', routine)
      if (routine.activityId == activityId) {
        res.status(403);
          next({
              error: "error posting routine_activities",
              message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
              name: "DuplicateRoutineActivityError"
          })
      } else {
        const addedActivity = await addActivityToRoutine({ routineId, activityId, count, duration });
        // console.log('did we add activity?: ', addedActivity)
        res.send(addedActivity);
      }
  } catch (error) {
      next({
          error: "error posting routine_activities",
          message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
          name: "DuplicateRoutineActivityError"
      })
  }
})



module.exports = router;
