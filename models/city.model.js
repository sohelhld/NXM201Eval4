const mongoose = require('mongoose');


const userCities = mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId,ref:"user",require:true}
    //  previousSearches :[{type:String,required:true}]
})

const userCitiesModel = mongoose.model("cities",userCities)


module.exports={
    userCitiesModel
}