require('dotenv').config()
const { default: nodemailer } = require('nodemailer')
const nodemail = require('nodemailer')

/*
Basic concept

Nodemailer mein mainly 3 cheezein hoti hain:

Your Node.js App
      ↓
Nodemailer Transporter
      ↓
Gmail SMTP
      ↓
Receiver's Email
 */
//Transporter - step-1
// Ye Gmail ke saath connection/authentication configure karta hai:

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD
    }
})

module.exports = transporter