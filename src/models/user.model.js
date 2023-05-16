const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    userLevel: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 2
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 1
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Users', userSchema)
