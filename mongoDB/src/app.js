const express = require('express')
const noteModel = require('./models/note.model.js')

const app = express()
app.use(express.json())
/*
GET - READ/FATCH
POST - SEND A DATA
DELETE - DALETE A DATA
PATCH - UPDATE PARTICULAAR DATA
PUT - UPDATE A DATA
*/
app.post('/notes',async(req,res)=>{
    const data = req.body //{title:data, description:data}
    await noteModel.create({
        title:data.title,
        description:data.description
    })
    res.status(201).json({
        message:'notes is created'
    })
})
app.get('/notes',async(req,res)=>{ //we are making a GET request  
    //first we have to find all notes to get the notes that reason we using find() ok
    const notes = await noteModel.find()//fine() this is built in method always reaturn a array
    res.status(200).json({
        message:"all notes is featched successfully",
        notes:notes
    })
})



module.exports = app