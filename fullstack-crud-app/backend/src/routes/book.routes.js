const express = require('express')

const { signIn, signUp } = require('../controllers/userAuth.controllers.js')

const router = express.Router()

router.get('/signin', signIn)

router.post('/signup', signUp)

module.exports = router