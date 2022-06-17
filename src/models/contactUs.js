const mongoose = require('mongoose')

const contactUs = mongoose.Schema({
    email:String,
    phone:String,
    query:String
})

module.exports = mongoose.model('queries', contactUs)