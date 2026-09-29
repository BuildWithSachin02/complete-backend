const { sign } = require('jsonwebtoken')
const authModel = require('../models/auth.models.js')
const bcrypt = require('bcrypt')


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
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)//compare function jo return me true aur false return krta h
            if (isMatch) {
                res.status(200).json({ status: true, message: 'signin sucessfully' })
            } else {
                res.json({ status: false, message: 'signin failed password is incorrect' })
            }
        } else {
            res.json({ status: true, message: 'signin failed not exits register first' })
        }
        res.status(200).json({
            status: true,
            message: 'fetched successfully',
            user
        })
    } catch (err) {
        res.status(401).json({
            status: false,
            message: 'cant fetch successfully',
            err: err.message
        })
    }
}

module.exports = { signIn, signUp }