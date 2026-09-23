const mongoose = require('mongoose')

async function connectDB() {
    try{
        await mongoose.connect('mongodb+srv://yt:J97qphQ9qxY9F7GG@complete-backend.swwnp5h.mongodb.net/practice_01')
        console.log('database is connected successfully ✔️')
    }catch(err){
        console.log('database is not connected! ❌')
    }
}
module.exports = connectDB