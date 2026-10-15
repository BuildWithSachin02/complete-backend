const mongoose = require('mongoose')

const employeesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required!']
    },
    age: {
        type: Number,
        required: [true, 'age is required!']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'phonenumber is required!']
    },
    salary: {
        type: {
            type: Number,
            required: [true, 'salary is required!']
        }
    }
}, { timestamps: true })

const employeeModel = mongoose.model('employe', employeesSchema)

module.exports = employeeModel