require('dotenv').config()
const mongoose = require('mongoose')

async function dbConnection() {
    try {
        mongoose.connect(process.env.DATABASE_URL)
        console.log('MongoDB is connected successfully✔️')
    } catch (err) {
        console.log('MongoDB not connected ❌')
    }
}

module.exports = dbConnection