const router = require('express').Router()
const report = require('../controllers/report')
const verifyToken = require('../middlewares/verifyToken')


router.post('/addReport', verifyToken.verifyToken, report.addReport)

module.exports = router