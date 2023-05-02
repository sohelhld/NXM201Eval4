const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userModel } = require('../models/user.model');
const { authorization } = require('../middleware/authorization.middleware');
const redis = require('redis');
const { redisClient } = require('../helper/redis');

const userRouter = express.Router()
require("dotenv").config()


userRouter.post("/signup",async(req,res)=>{
    const {name,email,password,preffer_city} = req.body
try {

    const isdataPresent = await userModel.findOne({email})
    if(isdataPresent) return res.send("user is alraday present please login")

    const hash = await bcrypt.hash(password,8)

    const data = new userModel({name,email,password:hash,preffer_city})

    await data.save()

    res.send("user is signup")
    
} catch (error) {
    res.send(error.message)
}
})

userRouter.post("/login",async(req,res)=>{

    try {
        const {email,password}= req.body
        const isuserPresent = await userModel.findOne({email})
        if(!isuserPresent) return res.send("User not present please sign up")
        
        const ispasswordCorrect = await bcrypt.compare(password,isuserPresent.password)
        if(!ispasswordCorrect) return res.send("wrong credential")

        const token =  jwt.sign({userId:isuserPresent._id,preffer_city:isuserPresent.preffer_city},process.env.jwt_secret,{expiresIn:"6hr"})
        
         res.cookie("token",token)
        //  console.log(req.cookies);
        res.send(({msg:"login succesful",token}))
    } catch (error) {
        res.send(error.message)
    }
})

userRouter.get("/test",authorization,(req,res)=>{
    res.send("testok")
})


userRouter.get("/logout",authorization,async(req,res)=>{
      
    try {
        const {token} = req.cookies
            
        if(!token) return res.status(401).send("unauthorization")

        await redisClient.set(token,token)
        res.send("logout succesfull")
    } catch (error) {
        res.send(error.message)
    }
})




module.exports={
    userRouter
}