const express = require("express")
const cors = require("cors")

const whitelist = process.env.WHITE_LIST_ORIGIN


module.exports = (app, express) => {

    app.use(express.json())

    // app.use(express.urlencoded({ extends: true }))

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Header', 'X-Requested-With, Content-Type, Authorization, Accept')
        res.header('Access-Control-Allow-Origin', '*') //http://localhost:5000
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')

        // if (!req.header('accept-lanuage')) {
        //     req.header('accept-lanuage', 'en-us')
        // }

        if (whitelist.indexOf(req.header("origin")) !== -1) {
            next()
        } else {
            res.sendStatus(403)
            // console.log("not allow origin")
        }
    })


}





