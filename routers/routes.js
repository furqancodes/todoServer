
const express = require('express');
const tasks = require("../models/tasks")
const router = express.Router();

router.get('/show', function(req, res){
   res.send(tasks);
});
// router.post('/add', async(req, res)=>{
//     // console.log(req.body)
//     const addTasks = new tasks({...req.body})
//     console.log(addTasks)
//     try {
//         await addTasks.save()
//         res.status(201).send(addTasks)
//     } catch (error) {
//         res.status(400).send(error)
//     }
//    res.send('POST route on things.');
// });
router.post("/add", async (req, res) => {
    const newTask = new tasks(req.body);
    try {
      await newTask.save();
      res.status(201).send({ newTask });
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
module.exports = router;