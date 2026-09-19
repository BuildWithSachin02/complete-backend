const mongoose = require('mongoose')

async function connectDB(){
    await mongoose.connect('mongodb+srv://yt:J97qphQ9qxY9F7GG@complete-backend.swwnp5h.mongodb.net/halley')
    console.log('mongoDB is connected succesfully!')
}
module.exports = connectDB