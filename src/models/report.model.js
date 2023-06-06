const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = new Schema({
    whistleBlower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    incidentType: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cause: {
        type: String,
        required: false,
        default: 'Unknown'
    },
    description: {
        type: String,
        required: true
    },
    actionsTaken: {
        type: String,
        required: false,
        default: 'None'
    },
    date: {
        type: Date,
        required: true
    },
    file: {
        type: String,
        required: false,
        default: 'None'
    }
})

module.exports = mongoose.model('Report', reportSchema)
