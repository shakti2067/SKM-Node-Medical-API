const mongoose = require("mongoose")

mongoose.connect(process.env.DB_DATA).then(() => {
    console.log("SKM mongoDB Databased connected")
}).catch((err) => {
    console.log("Error while connecting to mongoDB..", err)
})

mongoose.set('strictQuery', false);


// Debuge mongoose query
// mongoose.set("debug", true)