//TEST
const express = require("express");
const {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  updateRoutine,
  destroyRoutine,
} = require("../db/routines");
const router = express.Router();

// GET /api/routines
router.get("/routines", async (req, res, next) => {
  const allRoutines = await getAllRoutines();
  res.send({
    allRoutines,
  });
});

//TEST
// POST /api/routines
router.post("/routines", async (req, res, next) => {
  res.send("POSTED IN API/ROUTINES");
});

// PATCH /api/routines/:routineId

router.patch("/routines/:routineId", async (req, res, next) => {});

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
