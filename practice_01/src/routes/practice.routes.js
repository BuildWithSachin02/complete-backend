const express = require('express')
const { pagination, practiceDelete, practicePost, practiceUpdate, practiceGet } = require('../controllers/practice.controller.js')
const router = express.Router()

router.get('/get', practiceGet)
router.post('/post', practicePost)
router.put('/update/:id',practiceUpdate)
router.delete('/delete/:id',practiceDelete)
router.get('/pagination',pagination)//this query api-call

module.exports = router