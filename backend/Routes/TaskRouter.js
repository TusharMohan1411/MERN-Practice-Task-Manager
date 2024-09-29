const {
  createTask,
  fetchAllTask,
  deleteTaskById,
  updateTaskById,
} = require("../Controllers/TaskController");

const router = require("express").Router();

// To Get all Tasks
router.get("/", fetchAllTask);

// To Post new Task
router.post("/", createTask);

// To update Task
router.put("/:id", updateTaskById);

// To delete Task
router.delete("/:id", deleteTaskById);

module.exports = router;
