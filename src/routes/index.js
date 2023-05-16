const router = require('express').Router()

router.use('/authentication', require('./authentication'))
router.use('/user', require('./users'))
router.use('/location', require('./locations'))
router.use('/incident-type', require('./incidentTypes'))


module.exports = router