const mongoose = require('mongoose')

const URL = "database_url=mongodb+srv://admin:TrtZCuSISXnkH6Ru@cluster0.lfwbr.mongodb.net/todo?retryWrites=true&w=majority"

mongoose.connect(URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})