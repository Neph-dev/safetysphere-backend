const router = require('express').Router()
const report = require('../controllers/report')
const verifyToken = require('../middlewares/verifyToken')


router.post('/add-report', verifyToken.verifyToken, report.addReport)
router.post('/period-reports', verifyToken.verifyToken, report.getReportForaPeriod)
router.get('/all-reports', verifyToken.verifyToken, report.getAllReports)
router.get('/single-report/:id', verifyToken.verifyToken, report.getSingleReport)
router.get('/user-reports', verifyToken.verifyToken, report.getAllUserReports)
router.get('/user-reportsLength', verifyToken.verifyToken, report.getAllUserReportLength)
router.get('/location/:locationName', verifyToken.verifyToken, report.getReportByLocation)
router.post('/update-status/:id', verifyToken.verifyToken, report.updateReportStatus)
router.patch('/softdelete/:id', verifyToken.verifyToken, report.softDeleteReport)

module.exports = router