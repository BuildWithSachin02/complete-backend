const express = require('express')
const postModel = require('./models/post.model.js')
const multer = require('multer')
const app = express()
app.use(express.json())
//if we send a file format that data to our database so we have to use the second mildware and the name of the middleware is multer
const upload = multer({storage:multer.memoryStorage()})
app.post('/create-post', async (req, res) => {
    try {
        console.log(req.body)
        const result = await postModel.create()
        res.status(201).json({
            status: true,
            message: "post is created successfully",
            result
        })
    } catch (err) {
        res.status(501).json({
            status: false,
            message: 'not added!',
            err: err.message
        })
    }
})
module.exports = app