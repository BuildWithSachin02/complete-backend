const express = require('express')
const postModel = require('./models/post.model.js')
const uploadFile = require('./service/storage.service.js')
const multer = require('multer')
const app = express()
app.use(express.json())
//if we send a file format that data to our database so we have to use the second mildware and the name of the middleware is multer
const upload = multer({ storage: multer.memoryStorage() })
app.post('/create-post', upload.single('img'), async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)
        const result = await uploadFile(req.file.buffer)
        const post = await postModel.create({
            img:result.url,
            caption:req.body.caption
        })
        return res.status(201).json({
            status:true,
            message:'post is created successfully',
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
app.get('/get-post-data',async(req,res)=>{
    
})
module.exports = app