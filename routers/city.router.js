const {redisClient} = require("../helper/redis")
const {Router} = require("express")
 const axios = require("axios")
const { authorization } = require("../middleware/authorization.middleware")
const { validateIP } = require("../middleware/ipformat.middleware")

 require("dotenv").config()
const ipRouter = Router()

ipRouter.get("/:ip",authorization,validateIP,async(req,res)=>{
    // res.send("citi limit test")

    try {
        const ip = req.params.ip;

        const isipInCache = await redisClient.get(ip)
        if(isipInCache) return res.status(200).send({data:isipInCache})

        const response = await axios.get(` https://ipapi.co/${ip}`)
        console.log(response);

        const citiData = response.data;
        redisClient.set(ip,JSON.stringify(citiData),{Ex:60*60*6});
        res.send(citiData.city)

    } catch (error) {
        res.send(error.message)
        console.log(error.message);
    }

})

module.exports={
    ipRouter
}