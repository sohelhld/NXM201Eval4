const winston = require("winston")

const {MongoDB} = require("winston-mongodb")
require("dotenv").config()

const logger = winston.createLogger({
    level:"info",
    format:winston.format.json(),
    transports:[
            new MongoDB({
                db:process.env.mongoUrl,
                collection:"logs",
                options:{
                    userUnifiedTopology:true
                }
            })
    ]
})

module.exports={logger}