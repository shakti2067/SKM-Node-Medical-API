require("dotenv").config({ path: "../.env" })


const express = require("express")
const app = express()

// setup Mongodb 
require('./dbDriver/connection')


const port = process.env.PORT



app.get("/", (req, res) => {
    res.send("Medical node api server running")
})

// app.use(express.urlencoded({ urlencoded: true }))
app.use(express.json())

// setup Router
app.use('/', require('./routes'))


app.listen(port, () => {
    console.log(`Express Server listing on http://localhost:${port}`)
})