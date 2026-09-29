const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.DATABASE_URL
async function dbConnection(){
    try{
         await mongoose.connect(url)
         console.log('database is connected successfully✔️')
    }catch(err){
        console.log('database is not connected ❌')
    }
}

module.exports = dbConnection