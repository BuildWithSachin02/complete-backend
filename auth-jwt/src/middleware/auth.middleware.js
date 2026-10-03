//middleware is a used to  handle the requests  before send to server 
require('dotenv').config()
const jwt = require('jsonwebtoken')

async function verifyToken(req, res, next) {
    try {
        const token = req.query.token
        console.log(process.env.SECRETE_KEY)
        const payload = jwt.verify(token,process.env.SECRETE_KEY)
        console.log(payload)
        req.user = payload
        const decode = jwt.decode(payload)
        console.log(decode)
        next()
    } catch (err) {
        res.status(401).json({
            status: false,
            message: 'invalid requests',
            err: err.message
        })
    }
}
module.exports = verifyToken