const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const routes = require("./routers/routes")

app.use(routes)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})