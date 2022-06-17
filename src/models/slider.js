const mongoose = require("mongoose")

const slider = mongoose.Schema({
    title:String,
    subTitle:String,
    imageUrl:String
})


module.exports=mongoose.model('slider', slider)