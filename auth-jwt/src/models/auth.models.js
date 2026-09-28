const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true //constraits
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const authModel = mongoose.model('auths',authSchema)

module.exports = authModel