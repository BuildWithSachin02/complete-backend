const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    img:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
},{timestamps:true})

const postModel = mongoose.model('post',postSchema)
module.exports = postModel