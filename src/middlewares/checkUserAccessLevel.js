

module.exports.checkUserAccessLevel = async (req, res) => {
    if (req.userLevel === 0 || req.status === 1 || req.deleted === true) {
        return res.status(403).json({
            message: "You are not authorized to perform this action"
        })
    }
}
