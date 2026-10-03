require('dotenv').config()
const jwt = require('jsonwebtoken')
const authModel = require('../models/auth.models.js')
const bcrypt = require('bcrypt')
const transporter = require('../service/nodemail.service.js')
const path = require('path')


async function testMail(req, res) {
    try {
        const { to, text, subject } = req.body
        const info = await transporter.sendMail({
            from: `Sachin Dev <${process.env.EMAIL_USER}>`,
            to: to,
            subject: subject,
            html: `<div style="
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: auto;
            padding: 30px;
            border: 1px solid #ddd;
            border-radius: 10px;
        ">
            <h1 style="color: #333;">
                ${subject}
            </h1>

            <p>Hello,</p>
            <p>${text}</p>
            <p>
                We are excited to connect with you.
            </p>

            <hr>

            <p style="color: #777;">
                Regards,<br>
                <strong>Sachin Dev</strong>
            </p>
        </div>
        `,
        attachments:[
            {
                filename:'resume.pdf',
                path:path.join(__dirname,'../files/resume.pdf')
            }
        ]
        })
        res.status(200).json({
            status: true,
            message: 'mail is sent sucessfull',
            messageID: info.messageId,
            info
        })
    }
    catch (err) {
        res.status(401).json({
            status: false,
            message: 'cant send a nodemailer',
            err: err.message
        })
    }
}


async function signUp(req, res) {
    try {
        const { name, email, password } = req.body
        const hashPassword = await bcrypt.hash(password, 15)
        const result = await authModel.create({ name, email, password: hashPassword })
        res.status(201).json({
            status: true,
            message: 'signUp is successfully',
            result
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: 'signup proccess failed!',
            err: err.message
        })
    }
}

async function signIn(req, res) {
    try {
        //sigin wla logic ese kaam krta h ki jab koi user signup krta h tab boh usne register krta h 
        //toh yeh signin wla page yeh check krta h ki boh user exits krta h toh yes nhi oth no
        const { email, password } = req.body  // jo user ne apna email or password req krke bej rhaa hoga 
        const user = await authModel.findOne({ email }) //yeh hum find kr rhe database me 
        //now we check the exits email and the password is correct or not 
        if (!user) {
            res.status(401).json({
                status: false,
                message: 'user does not exits. Register First'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(401).json({
                status: false,
                message: 'Password is incorrect'
            })
        }
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.SECRETE_KEY,
            {
                expiresIn: '1m'
            }
        )
        res.status(200).json({
            status: true,
            message: 'signIn sucessfully',
            token
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: 'cant fetch successfully',
            err: err.message
        })
    }
}

async function getSingleUser(req, res) {
    try {
        const { email, token } = req.query
        const result = await authModel.findOne({ email })
        res.status(200).json({
            status: true,
            message: 'fetched this user',
            result
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            messsge: 'not fetched!',
            err: err.message
        })
    }
}
async function getAllusers(req, res) {
    try {
        const result = await authModel.find()
        res.status(200).json({
            status: true,
            message: 'data fetched successfully',
            result
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: 'data is not fetched!',
            err: err.message
        })
    }
}

module.exports = { signIn, signUp, getAllusers, getSingleUser, testMail }