const winston = require("winston");

let logger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
    ]
})
logger = winston.createLogger({
    level: "warn",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
    ],

})


module.exports = logger