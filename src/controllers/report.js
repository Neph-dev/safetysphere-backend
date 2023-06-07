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

module.exports.getAllUserReports = async (req, res) => {
    console.log(req.userId)
    try {
        const reports = await Report.find({ whistleBlower: req.userId })
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
    catch (err) {
        return res.status(500).json({
            message: 'Error getting reports',
            error: err
        })
    }
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

module.exports.getReportForaPeriod = async (req, res) => {

    let minDate = req.body.minDate
    let maxDate = req.body.maxDate

    const reports = await Report.find({
        date: {
            $gte: minDate,
            $lte: maxDate
        }
    })
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
