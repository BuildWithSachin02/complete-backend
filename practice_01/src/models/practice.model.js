const mongoose = require('mongoose')

const practiceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    phone: {
        type: Number,
        require: true
    }
}, { timestamps: true })

const practiceModel = mongoose.model('pratice', practiceSchema)
module.exports = practiceModel