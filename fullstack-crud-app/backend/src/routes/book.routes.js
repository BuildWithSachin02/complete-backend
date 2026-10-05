const express = require('express')
const authMiddleware = require('../middleware/auth.middleware.js')
const { getAllBooks, addBooks, deleteBooksById, updateBookById } = require('../controllers/books.controllers')
const router = express.Router()

router.get('/allbooks',authMiddleware,getAllBooks)
router.post('/postbooks',authMiddleware,addBooks)
router.delete('/deletebooks',authMiddleware,deleteBooksById)
router.put('/updatebook',authMiddleware,updateBookById)

module.exports = router