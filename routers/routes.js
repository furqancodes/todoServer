
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
    const createUser = new users(req.body);
    try {
      await createUser.save();
      const token = await createUser.generateToken();
      res.status(201).send({ createUser, token });
    } catch (createUserError) {
      res.status(400).send(createUserError);
    }
  });
module.exports = router;