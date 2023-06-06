const router = require('express').Router()
const user = require('../controllers/user')
const verifyToken = require('../middlewares/verifyToken')


router.post('/addUser', verifyToken.verifyToken, user.addUser)

router.get('/allusers', verifyToken.verifyToken, user.getAllUsers)
router.get('/singleUser/:id', verifyToken.verifyToken, user.getUserById)
router.get('/deletedusers', verifyToken.verifyToken, user.getDeletedUsers)
router.get('/suspendedusers', verifyToken.verifyToken, user.getSuspendedUsers)

router.patch('/softdelete/:id', verifyToken.verifyToken, user.softDeleteUser)
router.patch('/changeUserAccessLevel/:id', verifyToken.verifyToken, user.changeUserAccessLevel)
router.patch('/suspendUser/:id', verifyToken.verifyToken, user.suspendUser)


module.exports = router