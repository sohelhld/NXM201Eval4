const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on("connect",async(req,res)=>{
    console.log("connected to redis");
})

redisClient.on("error",(err)=>{
    console.log(err.message);
})

redisClient.connect()


module.exports={
    redisClient
}