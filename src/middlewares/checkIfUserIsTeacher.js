const checkIfUserIsTeacher = (req, res, next) => {
    if(req.user.isTeacher === true) {
        next();
    } else {
        res.status(401).json({
            status : "failure",
            message : "Unauthorized"
        })
    }
};

module.exports = checkIfUserIsTeacher ;