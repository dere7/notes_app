const mongoose = require('mongoose')

const Note = mongoose.model('Note', new mongoose.Schema({
    title: {
        type: String,
        minlength: 6,
        required: true
    },
    body: {
        type: String,
        minlength: 6,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        transform: (doc, obj) => {
            obj.id = obj._id.toString()
            delete obj._id
            delete obj.__v
        }
    }
}))

module.exports = Note