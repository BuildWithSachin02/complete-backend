const Student = require('../models/student.model.js')


//1. POST DATA TO DATABASE
const insertStudent = async (req, res) => {
    try {
        const student = req.body
        const result = await Student.create(student)
        res.json({
            status: true,
            message: 'Student added successfully',
            result,
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: 'student not added!',
            err: err.message
        })
    }
}

//2. DISPLAY DATA GET
const displayStudents = async (req, res) => {
    try {
        const data = await Student.find()
        res.json({
            status: true,
            message: 'student successfully fetched!',
            data,
        })

    } catch (err) {
        res.status(401).json({
            status: false,
            message: 'cant display the student check the server connection or maybe syntax error!',
            err: err.message
        })
    }
}

//3. PUT - UPDATE STUDENTS
const updateStudent = async (req, res) => {
    try {
        const student = req.body
        const id = req.params.id
        const result = await Student.findByIdAndUpdate(id, student)
        res.json({
            status: true,
            message: 'student update successfully',
            result,
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: 'updation failed!❌',
            err: err.message
        })
    }
}

//4. DELETE - DELETE STUDENTS
const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Student.findByIdAndDelete(id)
        res.json({
            status: true,
            message: 'deleted successfully ✔️',
            result,
        })
    } catch (err) {
        res.json({
            status: false,
            message: 'cant delete this momment check the server errr or syntax!❌',
            err: err.message
        })
    }
}

//5. searching by name
const searchByName = async (req, res) => {
    try {
        const name = req.params.name
        const result = await Student.find({ name })
        res.json({
            status: true,
            message: "searched founded",
            result
        })
    } catch (err) {
        res.json({
            status: false,
            message: 'error !',
            err: err.message
        })
    }
}

//6. - searching by rollernumber
const searchByRoleNumber = async (req, res) => {
    try {
        const rolenumber = req.query.rolenumber

        const result = await Student.find({ rolenumber })

        res.json({
            status: true,
            message: 'search the role founded',
            result
        })

    } catch (err) {
        res.status(500).json({
            status: false,
            message: 'search failed',
            err: err.message
        })
    }
}

//7. SEARCH BY ID
const searchById = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Student.findById(id)
        res.json({
            status: true,
            message: 'searched by id is founded',
            result
        })
    } catch (err) {
        res.json({
            status: false,
            message: 'not founded error !',
            err: err.message
        })
    }
}

module.exports = {
    insertStudent,
    displayStudents,
    updateStudent,
    deleteStudent,
    searchByName,
    searchById,
    searchByRoleNumber
}