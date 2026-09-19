const mongoose = require('mongoose')

async function connnectDB() {
    try {
        await mongoose.connect('mongodb+srv://yt:J97qphQ9qxY9F7GG@complete-backend.swwnp5h.mongodb.net/studentDB')
        console.log('Database is connected successfully ✔️')
    } catch (error) {
        console.log('database connection failed! ❌' + error.message)
    }
}
module.exports = connnectDB