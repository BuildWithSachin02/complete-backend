const express = require('express')
const { displayStudents, insertStudent, updateStudent, deleteStudent, searchById, searchByName, searchByRoleNumber } = require('../controller/student_controller')

const router = express.Router()

router.get('/', displayStudents)
router.post('/', insertStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)
router.get('/id/:id', searchById)
router.get('/name/:name', searchByName)
router.get('/rolenumber', searchByRoleNumber)

module.exports = router