const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
 const { redisClient } = require('../helper/redis');


const authorization = async(req,res,next)=>{

    try {
        const {token} = req.cookies
        // console.log({"authtoken":token});
        if (!token) return res.status(401).send("Please login again")

        const isTokenValid = await jwt.verify(token,process.env.jwt_secret)
        if(!isTokenValid) return res.send("Authication Faild")

        const istokenBlacklisted = await redisClient.get(token)
        if(istokenBlacklisted) return res.send("UnAuthorized")

        req.body.userId = isTokenValid.userId
        req.body.preffeed_city = isTokenValid.preffeed_city


        next()
    } catch (error) {
        res.send(error.message)
    }
 

}

module.exports={
    authorization
}