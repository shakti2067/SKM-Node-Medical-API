

const express = require("express")
const app = express.Router()

app.use("/api/query", require("./api/mongoCommon"))
app.use("/api/user", require('./api/user'))
app.use("/api/country", require("./api/country"))
app.use("/api/state", require('./api/state'))
app.use("/api/city", require("./api/city"))
app.use("/api/locality", require("./api/locality"))
app.use("/api/category", require("./api/category"))
app.use("/api/product", require("./api/products"))
app.use("/api/brand", require("./api/brands"))

app.use("/api/admin", require("./api/admin"))
app.use("/api/adminFeature", require("./api/adminFeature"))
app.use("/api/adminRole", require("./api/adminRole"))
app.use("/api/productForm", require("./api/productForm"))


module.exports = app

