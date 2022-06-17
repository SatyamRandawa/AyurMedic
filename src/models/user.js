const mongoose = require('mongoose')


const userRegister =new mongoose.Schema ({
    name:{
        type:String,
        required:true,
        toLowerCase:true
    },
    email:{
        type:String,
        required:true,
        toLowerCase:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    repeatPassword:{
        type:String,
        required:true
    }


},{timestamps: true})


module.exports = mongoose.model('user', userRegister)