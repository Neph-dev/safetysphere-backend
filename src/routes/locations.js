const router = require('express').Router()
const location = require('../controllers/location')
const verifyToken = require('../middlewares/verifyToken')


router.post('/add-location', verifyToken.verifyToken, location.addLocation)

router.get('/all-locations', verifyToken.verifyToken, location.getAllLocations)
router.get('/:id', verifyToken.verifyToken, location.getSingleLocation)
router.get('/soft-deleted-locations', verifyToken.verifyToken, location.getSoftDeletedLocations)

router.patch('/delete-location/:id', verifyToken.verifyToken, location.softDeleteLocation)

module.exports = router