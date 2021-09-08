const express = require("express");
const axios = require("axios")
const tasks = require("../models/tasks");
const router = express.Router();
require('dotenv').config()

router.get("/show", async (req, res) => {
  const allTasks = await tasks.find({});
  res.send(allTasks);
});

router.post("/add", async (req, res) => {
  const newTask = new tasks(req.body);
  console.log(process.env.slack_url)
  try {
    await newTask.save();
    await axios.post(process.env.slack_url,{
      text:`New to-do item is created: ${newTask.description}`,
    })
    res.status(201).send({message:"task added"});
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/tasks/:taskid", async (req, res) => {
  try {
    const taskDelete = await tasks.findByIdAndDelete(req.params.taskid);
    if (!taskDelete) {
      res.status(404).send("not found");
    }
    await axios.post(process.env.slack_url,{
      text:`${newTask.description} :item is removed`,
    })
    res.send({message:"Task Deleted"});
  } catch (taskDeleteError) {
    res.status(500).send(taskDeleteError);
  }
});
module.exports = router;
