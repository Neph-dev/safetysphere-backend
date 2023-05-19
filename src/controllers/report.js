const Report = require('../models/report.model')

module.exports.getAllReports = async (req, res) => {
    const reports = await Report.find({})

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

module.exports.getSingleReport = async (req, res) => {
    const report = await Report.findById(req.params.id)

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

module.exports.addReport = async (req, res) => {

    const report = new Report({
        whistleBlower: req.body.whistleBlower,
        location: req.body.location,
        incidentType: req.body.incidentType,
        title: req.body.title,
        cause: req.body.cause,
        description: req.body.description,
        actionsTaken: req.body.actionsTaken,
        date: req.body.date,
        file: req.body.file
    })
    const savedReport = await report.save()

    return res.status(200).json({
        message: 'Report added successfully',
        savedReport
    })
}
