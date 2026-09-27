require('dotenv').config()
const mongoose = require('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('database is connected successfully ✔️')
    } catch (err) {
        console.log('database is not coonected ❌')
    }
}

module.exports = connectDB