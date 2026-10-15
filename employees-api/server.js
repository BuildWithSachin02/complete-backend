require('dotenv').config()
const app = require('./src/app.js')
const dbConnection = require('./src/config/employee.db.js')
dbConnection()

app.listen(process.env.PORT, () => {
    console.log('server is running on:',process.env.PORT + '✔️')
})