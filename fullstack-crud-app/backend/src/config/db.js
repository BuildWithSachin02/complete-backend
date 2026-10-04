require('dotenv').config()
const mongoose = require('mongoose')
async function connectDB(req,res) {
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('DataBase is connected successfully ✔️')
    }catch(err){
        console.log('❌ connection failed to connect our database!')
    }
}
module.exports = connectDB