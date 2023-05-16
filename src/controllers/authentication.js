const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email, deleted: false })
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(401).json({
            message: "Incorrect password"
        })
    }

    if (user.status === 1) {
        return res.status(403).json({
            message: "Account suspended, Please contact you manager."
        })
    }

    const token = jwt.sign({
        data: {
            id: user._id,
            email: user.email,
            userLevel: user.userLevel,
            status: user.status,
            deleted: user.deleted
        }
    }, process.env.JWT_SECRET, { expiresIn: '24h' })

    return res.status(200).json({
        message: "Login successful",
        data: {
            name: user.name,
            surname: user.surname,
            profilePicture: user.profilePicture,
            position: user.position,
            email: user.email,
            phoneNumber: user.phoneNumber
        },
        token
    })
}