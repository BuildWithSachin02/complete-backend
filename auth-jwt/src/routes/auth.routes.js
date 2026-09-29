const express = require('express')
const { signIn, signUp } = require('../controllers/auth.controller')

const router = express.Router()

router.get('/signin', signIn) //GET
router.post('/signup', signUp)// POST

module.exports = router