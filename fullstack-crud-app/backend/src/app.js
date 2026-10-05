const express = require('express')
const cors = require('cors')
const userAuthRoutes = require('./routes/auth.routes.js')
const bookAuthRoutes = require('./routes/book.routes.js')
const app = express()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173"
}))

app.get('/', (req, res) => {
    res.send('hello app server')
})

app.use('/api/auth', userAuthRoutes)//FOR SIGNIN - SIGNUP(REGISTER)
app.use('/api/books', bookAuthRoutes) //FOR SEPARTE TO CRUD API
module.exports = app