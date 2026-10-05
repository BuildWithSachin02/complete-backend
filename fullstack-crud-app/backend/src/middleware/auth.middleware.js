const jwt = require('jsonwebtoken')
require('dotenv').config()

async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: 'Authorization Header is required'
            })
        }
        /*
            key: authorization
            value: asdfghj!@#$%^&*123(token hota h)
            isko ek array me daalke isko todna h hme
            ["authorization(key)":"asdfghjkmnbvcxz!@#$%^&*()123456(token-code-value)"]
            yeh hmne ek variable me store kiya aur ussme hmne 
            const token = authHeader.split(' ').[1] isko yeh space ko tod ke yhe usse index me convert krdega
         */
        const token = authHeader.split(' ')[1] // yeh krne ka purpose yeh h ki hmra forntend/postman me key : authorzation aur value : token wali value issn dono ke bich me space hota h isliye usko tod ne ke liye h yeh 
        if (!token) {
            return res.status(401).json({
                status: false,
                message: 'token is required!',
            })
        }
        const decode = jwt.verify(token, process.env.SECRETE_KEY)
        req.user = decode // abb yeh uss user ko yeh validate krega ki uss user ne login kiya aur boh gennuine h 
        next()
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: 'Invalid or expired token',
            error: err.message
        })
    }
}
module.exports = authMiddleware