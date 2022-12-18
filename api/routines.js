//TEST
const express = require("express");
const {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  destroyRoutine,
  updateRoutine,
} = require("../db/routines");
const {getAllActivities}= require ("../db/activities")
const router = express.Router();

// GET /api/routines
router.get("/routines", async (req, res, next) => {
  const allRoutines = await getAllRoutines();
  const allActivities = await getAllActivities();
  res.send(
    allRoutines,allActivities
  );
});

//TEST
// POST /api/routines
router.post("/routines", async (req, res, next) => {

    try{
        const {username, }
    }
  res.send("POSTED IN API/ROUTINES");
});

// PATCH /api/routines/:routineId

router.patch("/routines/:routineId", async (req, res, next) => {
    try{
        if(){
            const {name,description}= req.body
            const routineId = req.params.routineId
            const updtRoutine = await updateRoutine({
                id,
                name,
                description
            })
            res.send(updtRoutine)

        }else{
            res.send({
                name: "MissingRoutineError",
                message: "You must be logged in to perform this action",
            })
        }

    }catch (error){
        next (error)
    }
});

// DELETE /api/routines/:routineId
router.delete("/routines/:routineId", async (req, res, next) => {
  try {
    const routines = await getRoutineById(req.params.routineId);

    if (routines && routines.creator.id === req.user.id) {
      const updateRoutine = await updateRoutine(routines.id, { active: false });

      res.send({ routines: updateRoutine });
    } else {
      next(
        routines
          ? {
              name: "UnauthorizedUserError",
              message: "You cannot delete a routine which is not yours",
            }
          : {
              name: "RoutineNotFoundError",
              message: "That Routine does not exist",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/routines/:routineId/activities
router.post(
  "/:routineId/activities",
  async (req, res, next) => {}
);

module.exports = router;
