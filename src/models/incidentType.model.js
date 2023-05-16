const { mongoose } = require('mongoose')

const Schema = mongoose.Schema

const incidentTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('IncidentType', incidentTypeSchema)
