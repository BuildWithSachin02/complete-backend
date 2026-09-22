const express = require('express')
const app = express()
app.use(express.json())

app.get('/get', async (req, res) => {
    res.send('Hello world')
})

module.exports = app