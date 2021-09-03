const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const routes = require("./routers/routes")
require('./db/mongoose')

const port = process.env.PORT || 8080

app.use(express.json())
app.use(routes)


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})