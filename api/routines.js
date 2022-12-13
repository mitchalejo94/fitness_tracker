const express = require("express");
const {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  updateRoutine,
  destroyRoutine,
  updateRoutine,
} = require("../db/routines");
const router = express.Router();

// GET /api/routines
router.get("/api/routines", async (req, res, next) => {
  const allRoutines = await getAllRoutines();
  res.send({
    allRoutines,
  });
});

// POST /api/routines
router.post("/api/routines", async (req, res, next) => {
  res.send("POSTED IN API/ROUTINES");
});

// PATCH /api/routines/:routineId

router.patch("/api/routines/:routineId", async (req, res, next) => {});

// DELETE /api/routines/:routineId
router.delete("/api/routines/:routineId", async (req, res, next) => {
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
  "/api/routines/:routineId/activities",
  async (req, res, next) => {}
);

module.exports = router;
