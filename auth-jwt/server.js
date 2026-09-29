const app = require('./src/app.js')
require('dotenv').config()
const dbConnection = require('./src/config/db.js')
const authRoutes = require('./src/routes/auth.routes.js')

dbConnection()
const PORT = process.env.PORT
console.log(PORT)
app.use('/api/auth',authRoutes)
app.listen(PORT, () => {
    console.log('server is running on port number is ', PORT)
})
