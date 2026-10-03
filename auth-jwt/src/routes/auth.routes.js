const express = require('express')
const { signIn, signUp, getAllusers, getSingleUser, testMail } = require('../controllers/auth.controller')
const verifyToken = require('../middleware/auth.middleware')
const router = express.Router()

router.get('/signin',verifyToken, signIn) //GET
router.get('/singleuser',verifyToken, getSingleUser) //GET
router.post('/signup', signUp)// POST
router.get('/users',verifyToken ,getAllusers) // GET - get a all users
router.post('/email',testMail)//NODEMAILER
module.exports = router