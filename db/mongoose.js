const mongoose = require('mongoose')

const URL = "mongodb+srv://admin:TrtZCuSISXnkH6Ru@cluster0.lfwbr.mongodb.net/todo?retryWrites=true&w=majority"

mongoose.connect(URL,
  err => {
      if(err) throw err;
      console.log('connected to MongoDB')
  });