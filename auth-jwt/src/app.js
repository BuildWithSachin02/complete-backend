const express = require('express')

const app = express()
app.use(express.json())

app.get('/',async(req,res)=>{
    try{
        res.send('now i am learning JWT-AUTH')
    }catch(err){
        console.log('error found', err.message)
    }
})

module.exports = app