const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
}, { timestamps:true })

const noteModel = mongoose.model('Notes', NotesSchema);
module.exports = noteModel;