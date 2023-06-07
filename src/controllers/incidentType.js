const { checkUserAccessLevel } = require('../middlewares/checkUserAccessLevel')
const IncidentType = require('../models/incidentType.model')


module.exports.getAllIncidentTypes = async (req, res) => {

    const incidentTypes = await IncidentType.find({ deleted: false })

    if (incidentTypes) {
        return res.status(200).json({
            message: 'All IncidentType',
            incidentTypes
        })
    }

    return res.status(404).json({
        message: 'No IncidentType found'
    })
}

module.exports.getSingleIncidentType = async (req, res) => {

    const incidentType = await IncidentType.findById(req.params.id, { deleted: false })

    if (incidentType) {
        return res.status(200).json({
            message: 'IncidentType',
            incidentType
        })
    }

    return res.status(404).json({
        message: 'IncidentType not found'
    })
}

module.exports.getSoftDeletedIncidentsType = async (req, res) => {

    await checkUserAccessLevel(req, res)

    const incidentTypes = await IncidentType.find({}, { deleted: true })

    if (incidentTypes) {
        return res.status(200).json({
            message: 'All IncidentType',
            incidentTypes
        })
    }

    return res.status(404).json({
        message: 'No IncidentType found'
    })
}

module.exports.addIncidentType = async (req, res) => {

    await checkUserAccessLevel(req, res)

    const incidentType = new IncidentType({
        name: req.body.name
    })

    const newIncidentType = await incidentType.save()

    if (newIncidentType) {
        return res.status(201).json({
            message: 'New IncidentType added',
            newIncidentType
        })
    }

    return res.status(500).json({
        message: 'Error adding new IncidentType'
    })
}

module.exports.softDeleteIncidentType = async (req, res) => {

    await checkUserAccessLevel(req, res)

    const incidentType = await IncidentType.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true })

    if (incidentType) {
        return res.status(200).json({
            message: 'IncidentType deleted successfully',
            incidentType
        })
    }

    return res.status(500).json({
        message: 'Error deleting IncidentType'
    })
}