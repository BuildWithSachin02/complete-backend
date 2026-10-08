const bookModel = require('../models/books.model.js')

async function addBooks(req, res) {
    try {
        const book = req.body
        const result = await bookModel.create(book)
        res.status(201).json({
            status: true,
            message: 'book is created',
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: 'cant create your book check your giving a right value!',
            err: err.message
        })
    }
}

async function getAllBooks(req, res) {
    try {
        const result = await bookModel.find()
        res.status(200).json({
            status: true,
            message: 'fetched all books',
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: 'cant fetch all books!',
            err: err.message
        })
    }
}

async function deleteBooksById(req, res) {
    try {
        const id = req.query.id
        const result = await bookModel.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: 'book is deleted successfully',
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: 'cant delete the book !',
            err: err.message
        })
    }
}

async function updateBookById(req, res) {
    try {
        const id = req.query.id
        const book = req.body
        const result = await bookModel.findByIdAndUpdate(id, book, { new: true, runValidators: true })
        if (!result) {
            return res.status(400).json({
                status: false,
                message: 'book not found!'
            })
        }
        res.status(200).json({
            status: true,
            message: 'updated successfully',
            result
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: 'cant update!',
            err: err.message
        })
    }
}
module.exports = { addBooks, getAllBooks, updateBookById, deleteBooksById }