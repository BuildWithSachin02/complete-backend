const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://yt:J97qphQ9qxY9F7GG@complete-backend.swwnp5h.mongodb.net/project-1')
        console.log('database is connected successfully ✔️')
    } catch (err) {
        console.log('database is not coonected ❌')
    }
}

module.exports = connectDB