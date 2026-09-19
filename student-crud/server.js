const express = require('express')

const app = express()

const connnectDB = require('./src/config/db.js')
const student_routes = require('./src/routes/student.routes.js')

app.use(express.json())

connnectDB()

app.use('/api/students', student_routes)

app.listen(5050, () => {
    console.log('Server is running on port 5050')
})