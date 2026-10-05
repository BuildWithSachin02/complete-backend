const express = require('express')

const { signIn, signUp } = require('../controllers/userAuth.controllers.js')
const { getAllBooks, addBooks, deleteBooksById, updateBookById } = require('../controllers/books.controllers.js')

const router = express.Router()

router.get('/signin', signIn)

router.post('/signup', signUp)

router.get('/allbooks', getAllBooks)

router.post('/addbooks', addBooks)

router.delete('deletebook', deleteBooksById)

router.put('updatebook', updateBookById)

module.exports = router