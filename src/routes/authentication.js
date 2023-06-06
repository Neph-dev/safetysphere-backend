const router = require('express').Router()
const authentication = require('../controllers/authentication')
const adminAuth = require('../controllers/adminAuth')

router.post('/login', authentication.login)
router.post('/admin-login', adminAuth.adminLogin)

module.exports = router