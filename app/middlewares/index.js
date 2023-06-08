const express = require("express")
const cors = require("cors")

const whitelist = process.env.WHITE_LIST_ORIGIN


module.exports = (app, express) => {

    app.use(express.json())

    // app.use(express.urlencoded({ extends: true }))

    app.use((req, res, next) => {
        // console.log('req.header::', req.headers)

        if (whitelist.indexOf(req.header("origin")) !== -1) {
            next()
        } else {
            res.sendStatus(403)
            // console.log("not allow origin")
        }
    })


}





