const mongoose = require('mongoose')

const User = mongoose.model('User', new mongoose.Schema({
    fullName: {
        minLength: 4,
        type: String
    },
    email: {
        unique: true,
        required: true,
        minLength: 6,
        type: String
    },
    password: {
        required: true,
        minLength: 6,
        type: String
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
}, {
    toJSON: {
        transform: (doc, obj) => {
            obj.id = obj._id.toString()
            delete obj._id
            delete obj.__v
            delete obj.password
        }
    }
}))
module.exports = User
