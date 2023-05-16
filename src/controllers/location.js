const { checkUserAccessLevel } = require('../middlewares/checkUserAccessLevel')
const Location = require('../models/location.model')


module.exports.getAllLocations = async (req, res) => {
    const locations = await Location.find({}, { deleted: false })

    if (locations) {
        return res.status(200).json({
            message: 'All locations',
            locations
        })
    }

    return res.status(404).json({
        message: 'No locations found'
    })
}

module.exports.getSingleLocation = async (req, res) => {
    const location = await Location.findById(req.params.id, { deleted: false })

    if (location) {
        return res.status(200).json({
            message: 'Location',
            location
        })
    }

    return res.status(404).json({
        message: 'Location not found'
    })
}

module.exports.getSoftDeletedLocations = async (req, res) => {

    await checkUserAccessLevel(req, res)

    const locations = await Location.find({}, { deleted: true })

    if (locations) {
        return res.status(200).json({
            message: 'All locations',
            locations
        })
    }

    return res.status(404).json({
        message: 'No locations found'
    })
}

module.exports.addLocation = async (req, res) => {

    await checkUserAccessLevel(req, res)

    const location = new Location({
        name: req.body.name
    })
    const savedLocation = await location.save()

    if (savedLocation) {
        return res.status(201).json({
            message: 'Location added successfully',
            location: savedLocation
        })
    }

    return res.status(400).json({
        message: 'Location not added'
    })
}

module.exports.softDeleteLocation = async (req, res) => {

    await checkUserAccessLevel(req, res)

    const location = await Location.findByIdAndUpdate(req.params.id, { deleted: true })

    if (location) {
        return res.status(200).json({
            message: 'Location deleted successfully',
            location
        })
    }

    return res.status(404).json({
        message: 'Location not found'
    })

}