const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: [true, 'Book name is required'],
        trim: true
    },

    bookAuthor: {
        type: String,
        required: [true, 'Book author is required'],
        trim: true
    },

    bookPublishYear: {
        type: Number,
        required: [true, 'Book publish year is required']
    },

    bookCategory: {
        type: String,
        required: [true, 'Book category is required'],
        trim: true
    },
    bookMessage: {
        type: String,
        required: [true, 'book message is required!'],
        trim: true
    }
}, {
    timestamps: true
})

const bookModel = mongoose.model('books', bookSchema)

module.exports = bookModel