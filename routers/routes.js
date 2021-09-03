const express = require("express");
const tasks = require("../models/tasks");
const router = express.Router();

router.get("/show", async (req, res) => {
  const allTasks = await tasks.find({});
  res.send(allTasks);
});

router.post("/add", async (req, res) => {
  const newTask = new tasks(req.body);
  try {
    await newTask.save();
    res.status(201).send({ newTask });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/tasks/:taskid", async (req, res) => {
  console.log(req.params.taskid)
  try {
    const taskDelete = await tasks.findByIdAndDelete(req.params.taskid);
    if (!taskDelete) {
      res.status(404).send("not found");
    }
    res.send(taskDelete);
  } catch (taskDeleteError) {
    res.status(500).send(taskDeleteError);
  }
});
module.exports = router;
