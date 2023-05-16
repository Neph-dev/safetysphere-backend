const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = new Schema({
    whistleBlower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    incidentType: {
        type: Schema.Types.ObjectId,
        ref: 'IncidentType',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cause: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    actionsTaken: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    file: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Report', reportSchema)
