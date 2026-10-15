const express = require('express')

const app = express()
app.use(express.json())

app.get('/', async (req, res) => {
    try {
        res.send('hello app server')
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = app