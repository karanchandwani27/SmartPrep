const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    test: {
        required: true,
        type: Number
    },
    created_date: {
        required: true,
        type: Date
    },
    email: {
        required: false,
        type: String
    },
    course: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('User', dataSchema)