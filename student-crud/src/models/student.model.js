const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    },
    rolenumber:
    {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        require: true
    },
    stdid: {
        type: Number,
        require: true
    },
    class: {
        type: String,
        require: true
    }
}, { timestamps: true })

const studentModel = mongoose.model('students',studentSchema)
module.exports = studentModel