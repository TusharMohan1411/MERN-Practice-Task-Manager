const TaskModel = require("../Models/TaskModel");

const createTask = async (req, res) => {
  const data = req.body;
  try {
    const model = new TaskModel(data);
    await model.save();
    res.status(201).json({ message: "New Task Created", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to Create Task", success: false });
  }
};

const fetchAllTask = async (req, res) => {
  try {
    const data = await TaskModel.find({});
    res.status(200).json({ message: "All Tasks get", success: true, data });
  } catch (err) {
    res.status(500).json({ message: "Failed to get all Task", success: false });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    await TaskModel.findByIdAndUpdate(id, obj);
    res.status(200).json({ message: "Task Updated", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to Update Task", success: false });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Task Deleted Successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete Task", success: false });
  }
};

module.exports = {
  createTask,
  fetchAllTask,
  updateTaskById,
  deleteTaskById,
};
