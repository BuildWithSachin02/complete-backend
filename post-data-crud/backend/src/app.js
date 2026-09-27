const express = require('express')
const postModel = require('./models/post.model.js')
const uploadFile = require('./service/storage.service.js')
const multer = require('multer')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
//if we send a file format that data to our database so we have to use the second mildware and the name of the middleware is multer
const upload = multer({ storage: multer.memoryStorage() })
app.post('/create-post', upload.single('img'), async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)
        const result = await uploadFile(req.file.buffer)
        const post = await postModel.create({
            img: result.url,
            caption: req.body.caption
        })
        return res.status(201).json({
            status: true,
            message: 'post is created successfully',
            post
        })
    } catch (err) {
        res.status(501).json({
            status: false,
            message: 'not added!',
            err: err.message
        })
    }
})
app.get('/get-posts', async (req, res) => {
    try {
        const post = await postModel.find()
        res.status(200).json({
            status:true,
            message:'fetching the all data',
            post
        })
    }catch(err){
        res.status.json({
            status:false,
            message:'fetching is failed!',
            err:err.message
        })
    }    
})
module.exports = app