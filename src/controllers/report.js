const { checkUserAccessLevel } = require('../middlewares/checkUserAccessLevel')
const Report = require('../models/report.model')

module.exports.getAllReports = async (req, res) => {
    const reports = await Report.find({ deleted: false })
        .select("whistleBlower location incidentType title cause description date actionsTaken status")

    if (reports) {
        return res.status(200).json({
            message: 'All reports',
            reports
        })
    }

    return res.status(404).json({
        message: 'No reports found'
    })
}

module.exports.getAllUserReports = async (req, res) => {

    const reports = await Report.find({ whistleBlower: req.userId, deleted: false })
        .select("whistleBlower location incidentType title cause description date actionsTaken status")
    if (reports) {
        return res.status(200).json({
            message: 'All user reports',
            reports
        })
    }

    return res.status(404).json({
        message: 'No reports found'
    })
}

module.exports.getAllUserReportLength = async (req, res) => {

    const reports = await Report.find({ whistleBlower: req.userId, deleted: false })
        .select("whistleBlower")
    if (reports) {
        return res.status(200).json({
            message: 'All user reports',
            reports
        })
    }

    return res.status(404).json({
        message: 'No reports found'
    })
}

module.exports.getSingleReport = async (req, res) => {

    const report = await Report.findOne({ _id: req.params.id, deleted: false })
    if (report) {
        return res.status(200).json({
            message: 'Report',
            report
        })
    }

    return res.status(404).json({
        message: 'Report not found'
    })
}

module.exports.getReportForaPeriod = async (req, res) => {

    let minDate = req.body.minDate
    let maxDate = req.body.maxDate

    const reports = await Report.find({
        date: {
            $gte: minDate,
            $lte: maxDate
        },
        deleted: false
    })
        .select("whistleBlower location incidentType title cause description date actionsTaken status")

    if (reports) {
        return res.status(200).json({
            message: 'Reports',
            reports
        })
    }
    return res.status(404).json({
        message: 'No reports found'
    })
}

module.exports.getReportByLocation = async (req, res) => {

    let location = req.params.locationName

    const reports = await Report.find({
        location: location, deleted: false
    })
        .select("whistleBlower location incidentType title cause description date actionsTaken status")

    if (reports) {
        return res.status(200).json({
            message: 'Reports',
            reports
        })
    }
    return res.status(404).json({
        message: 'No reports found'
    })
}

module.exports.addReport = async (req, res) => {

    const report = new Report({
        whistleBlower: req.userId,
        location: req.body.location,
        incidentType: req.body.type,
        title: req.body.title,
        cause: req.body.cause,
        description: req.body.description,
        actionsTaken: req.body.actionsTaken,
        date: req.body.date,
        file: req.body.file
    })

    await report.save()
        .then(() => {
            res.status(200).json({
                message: 'Report added successfully'
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error adding report',
                error: err
            })
        })
}

module.exports.updateReportStatus = async (req, res) => {

    await checkUserAccessLevel(req, res)

    let newStatus = req.body.status

    const report = await Report.findByIdAndUpdate(
        req.params.id, { status: newStatus }
    )

    if (report) {
        return res.status(200).json({
            message: 'Status updated successfully',
        })
    }

    return res.status(500).json({
        message: 'Error updating status'
    })
}

module.exports.softDeleteReport = async (req, res) => {
    await checkUserAccessLevel(req, res)

    const report = await Report.findByIdAndUpdate(req.params.id, { deleted: true })

    if (report) {
        return res.status(200).json({
            message: 'Report deleted successfully',
            report
        })
    }

    return res.status(404).json({
        message: 'Report not found'
    })

}
