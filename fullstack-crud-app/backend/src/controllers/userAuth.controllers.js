require('dotenv').config()
const authModel = require('../models/auth.models.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//USER SIGNUP/CONTROLLERS - REGISTER
async function signUp(req, res) {
    try {
        const { email, name, password } = req.body
        const hashPassword = await bcrypt.hash(password, 12)
        const result = await authModel.create({ name, email, password: hashPassword })
        res.status(201).json({
            status: true,
            message: 'user is created successfully',
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: 'user is not created check where is cause!',
            err: err.message
        })
    }
}

//SIGNIN/CONTROLLERS - GET/JWT-TOKENS
async function signIn(req, res) {
    try {
        const { email, password } = req.body
        const user = await authModel.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: 'user does not exits, Register first'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: 'Password is incorrect!'
            })
        }
        //THEN WE GIVE A TOKEN AND GENERATE A TOKEN
        const token = jwt.sign({
            name: user.name,
            email: user.email
        },
            process.env.SECRETE_KEY,
            {
                expiresIn: '1h'
            }
        )
        res.status(200).json({
            status: true,
            message: 'signIn successfully',
            token
        })

    }
    catch (err) {
        res.status(400).json({
            status: false,
            message: 'user is not register yet goto the signup page!',
            err: err.message
        })
    }
}

module.exports = { signIn, signUp }