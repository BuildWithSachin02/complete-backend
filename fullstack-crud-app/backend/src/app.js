const express = require('express')

const userAuthRoutes = require('./routes/book.routes.js')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello app server')
})

app.use('/api/auth', userAuthRoutes)

module.exports = app