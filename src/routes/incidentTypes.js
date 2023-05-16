const router = require('express').Router()
const incident = require('../controllers/incidentType')
const verifyToken = require('../middlewares/verifyToken')


router.post('/add-incident-type', verifyToken.verifyToken, incident.addIncidentType)

router.get('/all-incidents-type', verifyToken.verifyToken, incident.getAllIncidentTypes)
router.get('/:id', verifyToken.verifyToken, incident.getSingleIncidentType)
router.get('/soft-deleted-incidents-type', verifyToken.verifyToken, incident.getSoftDeletedIncidentsType)

router.patch('/delete-incident-type/:id', verifyToken.verifyToken, incident.softDeleteIncidentType)

module.exports = router