//this is file stand for server creating
const express = require('express')
const app = express()
app.use(express.json())//now what the meaning of we use it ?? when i send to data to postment to our server so our express didnt reconnize the that data so we have to tell the express anything come to a data to use have to complile or translate in json formate that it
/*
const notes = [
{
    'title':'my first backend project',
    'description':'REST API'
},
]
*/
const notes = []
app.get('/',(req,res)=>{
    res.send('Hello GET API METHOD and see the result go to the browser')
})
app.post('/notes',(req,res)=>{
    console.log(req.body)//when we send a data to frontend to backend when we need to add the value in variable so we have to use the middleware
    notes.push(req.body)
    res.status(201).json({
        Message:"created a note succesfully"
    })
})
app.get('/notes',(req,res)=>{
    res.status(200).json({
        message: "notes fetched successfully",
        notes: notes
    })
})
module.exports = app