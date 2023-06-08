require("dotenv").config({ path: "../.env" })
const mailer = require("./utils/mailer")
const cors = require("cors")
const corsOptions = require('./middlewares')
const express = require("express")
const app = express()

// setup Mongodb 
require('./dbDriver/connection')


const port = process.env.PORT

process.on("unhandledRejection", (err) => {
    let mailOption = {
        to: "aniyaliyashaktiwhatsapp@gmail.com",
        subject: "error in skm development",
        text: err
    }
    // mailer.sendMail(mailOption)
    console.log("unhandledRejection error in  development ::", err)

})

process.on("uncaughtException", (err) => {
    let mailOption = {
        to: "aniyaliyashaktiwhatsapp@gmail.com",
        subject: "error in skm development",
        text: err
    }
    // mailer.sendMail(mailOption)
    console.log(" uncaughtException error in development ::", err)
})

app.get("/", (req, res) => {
    res.send("Medical node api server running")
})

// app.use(express.urlencoded({ urlencoded: true }))

// put here all middlewares
require("./middlewares/index")(app, express)


// setup Router
app.use('/', require('./routes'))


app.listen(port, () => {
    console.log(`Express Server listing on http://localhost:${port}`)
})