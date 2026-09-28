const { sign } = require('jsonwebtoken')
const authModel = require('../models/auth.models.js')


async function signUp(req, res) {
    try {
        const data = req.body
        const result = await authModel.create(data)
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
        const result = await authModel.find()
        res.status(200).json({
            status: true,
            message: 'fetched successfully',
            result
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