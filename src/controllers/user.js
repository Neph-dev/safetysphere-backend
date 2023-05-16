const { checkUserAccessLevel } = require('../middlewares/checkUserAccessLevel')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const generator = require('generate-password')
const nodemailer = require("nodemailer")


const fromEmail = 'snephthali@gmail.com'
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: fromEmail,
        pass: process.env.EMAIL_PASSWORD,
    },
})

module.exports.addUser = async (req, res) => {

    await checkUserAccessLevel(req, res)

    const emailCheck = await User.findOne({ email: req.body.email })
    if (emailCheck) {
        return res.status(400).json({
            message: 'User already exists'
        })
    }

    const saltRounds = 10
    const generatedPassword = generator.generate({ length: 10, numbers: true })

    bcrypt.hash(generatedPassword, saltRounds, async (err, hash) => {

        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            profilePicture: req.body.profilePicture,
            position: req.body.position,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            userLevel: req.body.userLevel,
            password: hash,
        })

        try {
            const savedUser = await user.save()

            transporter.sendMail({
                from: fromEmail,
                to: 'webwithneph@gmail.com', //email.toLowerCase(),
                subject: 'YOUR GENERATED PASSWORD',
                text: `Your new Send-It password is: ${generatedPassword} \n \nDO NOT SHARE THIS WITH ANYONE!`,
            })

            return res.status(200).json({
                message: 'User added successfully',
                savedUser
            })
        }
        catch (err) {
            return res.status(400).json({
                message: err
            })
        }
    })
}

module.exports.changeUserAccessLevel = async (req, res) => {

    await checkUserAccessLevel(req, res)

    const newAccessLevel = req.body.userLevel

    const user = await User.findByIdAndUpdate(req.params.id, { userLevel: newAccessLevel })

    if (res.error) return res.status(403).json(res.error)

    return res.status(200).json({
        message: 'User Access Changed successfully',
        user
    })
}

module.exports.suspendUser = async (req, res) => {

    await checkUserAccessLevel(req, res)
    const user = await User.findByIdAndUpdate(req.params.id, { status: 1 })

    if (res.error) return res.status(403).json(res.error)

    return res.status(200).json({
        message: 'Account suspended successfully',
        user
    })
}

module.exports.softDeleteUser = async (req, res) => {

    await checkUserAccessLevel(req, res)
    const user = await User.findByIdAndUpdate(req.params.id, { deleted: true })

    if (res.error) return res.status(403).json(res.error)

    return res.status(200).json({
        message: 'User deleted successfully',
        user
    })
}

module.exports.getAllUsers = async (req, res) => {

    await checkUserAccessLevel(req, res)

    const users = await User.find({ deleted: false, status: 0 })

    if (res.error) return res.status(403).json(res.error)

    return res.status(200).json({
        message: 'All users',
        users
    })
}

module.exports.getDeletedUsers = async (req, res) => {

    await checkUserAccessLevel(req, res)

    const users = await User.find({ deleted: true })

    if (res.error) return res.status(403).json(res.error)

    return res.status(200).json({
        message: 'Deleted users',
        users
    })
}

module.exports.getSuspendedUsers = async (req, res) => {

    await checkUserAccessLevel(req, res)

    const users = await User.find({ status: 1 })

    if (res.error) return res.status(403).json(res.error)

    return res.status(200).json({
        message: 'Suspended users',
        users
    })
}

module.exports.getUserById = async (req, res) => {

    if (req.params.id !== 'null') {

        await checkUserAccessLevel(req, res)

        const user = await User.findById(req.params.id)

        if (res.error) return res.status(403).json(res.error)

        return res.status(200).json({
            message: 'User data',
            data: {
                _id: user._id,
                name: user.name,
                surname: user.surname,
                profilePicture: user.profilePicture,
                position: user.position,
                email: user.email,
                phoneNumber: user.phoneNumber
            }
        })
    }

    else {
        const user = await User.findById(req.userId)

        if (res.error) return res.status(403).json(res.error)

        return res.status(200).json({
            message: 'User data',
            data: {
                name: user.name,
                surname: user.surname,
                profilePicture: user.profilePicture,
                position: user.position,
                email: user.email,
                phoneNumber: user.phoneNumber
            }
        })
    }
}