const express = require("express");
const axios = require("axios");
const tasks = require("../models/tasks");
const router = express.Router();
require("dotenv").config();

router.get("/show", async (req, res) => {
  const allTasks = await tasks.find({});
  res.send(allTasks);
});

router.post("/add", async (req, res) => {
  const newTask = new tasks(req.body);
  try {
    await newTask.save();
    await axios.post(process.env.slack_url, {
      text: `New to-do item is created: ${newTask.description}`,
    });
    res.status(201).send({ message: "task added" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch("/update/:taskid", async (req, res) => {
  const { description, completed } = req.body;
  console.log(`req.params.taskid ${req.params.taskid}`);
  try {
    const updatedTask = await tasks.findOneAndUpdate(
      { _id: req.params.taskid },
      { description, completed }
    );
    await axios.post(process.env.slack_url, {
      text: `${updatedTask.description} :has been changed to : ${description}`,
    });
    console.log(`updated task ${updatedTask}`);
    res.status(200).send({ message: "task updated" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:taskid", async (req, res) => {
  try {
    const taskDelete = await tasks.findByIdAndDelete(req.params.taskid);
    if (!taskDelete) {
      res.status(404).send("not found");
    }
    await axios.post(process.env.slack_url, {
      text: `${taskDelete.description} :item is removed`,
    });
    res.send({ message: "Task Deleted" });
  } catch (taskDeleteError) {
    res.status(500).send(taskDeleteError);
  }
});

router.post("/slack", async (req, res) => {
  const { tasks, message } = req.body;
  const blocks = tasks.map((task) => {
    return {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: ` ▪ ${task.description}`,
        },
      ],
    };
  });
  try {
    await axios.post(process.env.slack_url, {
      text: message,
      blocks,
    });
    res.send({ message: "Pushed to Slack" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
