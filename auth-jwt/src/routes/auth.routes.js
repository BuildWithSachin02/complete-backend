const express = require('express')
const { signIn, signUp, getAllusers } = require('../controllers/auth.controller')

const router = express.Router()

router.get('/signin', signIn) //GET
router.post('/signup', signUp)// POST
router.get('/users', getAllusers) // GET - get a all users

module.exports = router