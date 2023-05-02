const express = require('express');
const { connection } = require('./db');
const { userModel } = require('./models/user.model');
const { userRouter } = require('./routers/user.route');
var cookieParser = require('cookie-parser');
const { ipRouter } = require('./routers/city.router');
const {logger} = require ("./middleware/logger.middleware")


require("dotenv").config()
const app = express()
app.use(cookieParser())
app.use(express.json())

app.use("/users",userRouter)
app.use("/ips",ipRouter)
app.get("/",(req,res)=>{
    res.send("test okk")
})


app.listen(process.env.port,async()=>{

    try {
        await connection
        console.log("db is connected")
        logger.log("info","database is connected ")
    } catch (error) {
        console.log(error.message)
        logger.log("error","database is connected faild")
    }

    console.log("server is runing")
})