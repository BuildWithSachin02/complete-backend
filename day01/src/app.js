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
app.get('/', (req, res) => {
    res.send('Hello GET API METHOD and see the result go to the browser')
})
app.post('/notes', (req, res) => {
    console.log(req.body)//when we send a data to frontend to backend when we need to add the value in variable so we have to use the middleware
    notes.push(req.body)
    res.status(201).json({
        Message: "created a note succesfully"
    })
})
app.get('/notes', (req, res) => {
    res.status(200).json({
        message: "notes fetched successfully",
        notes: notes
    })
})
// we call the delete API-CALL suppose we have huge of data in array and if user want to delete this reel so reel having index or id ok that can we have we have to delete
//what is /notes/index => it means hmra static kyy h /notes/ yeh static naya kyy add hmne kiya index yeh kyy krega jo hme delete krna boh usse delete kre uss index rahi value ko 
// jese hmmlo humne frontend pe koi ui bnya uske click pe hmne click kiya toh uss index ko lenge index == index toh delete krdo bss
//aur toh hme express se hme :index ko yeh milta h ki abhi yeh pe index ane wla h toh hme yeh chiz express ko pta chla jata h 
app.delete('/notes/:index', (req, res) => {
    const index = req.params.index //issme hme index milega boh usseme kahi ek varible me store krunga 
    notes.splice(index,1)
    console.log(notes.length)
    res.status(200).json({
        message:`${index} this index is successfully deleted!`
    })
})
app.patch('/notes/:index',(req,res)=>{
    const index = req.params.index
    const name = req.body.name
    notes[index].name = name
    res.status(200).json({
        message:"updated successfully!"
    })
})















module.exports = app