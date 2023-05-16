const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports.verifyToken = (req, res, next) => {
    const token = req.headers['access-token']

    if (!token) {
        return res.status(403).json({
            message: "No token provided"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const userCheck = await User.findOne({ _id: decoded.data.id })
        if (!userCheck) {
            return res.status(401).json({
                message: 'User does not exist'
            })
        }

        req.userId = decoded.data.id
        req.email = decoded.data.email
        req.status = decoded.data.status
        req.userLevel = decoded.data.userLevel
        req.deleted = decoded.data.deleted

        next()
    })
}