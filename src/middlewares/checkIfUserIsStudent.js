const checkIfUserIsStudent = (req, res, next) => {
    if(req.user.isStudent === true) {
        next();
    } else {
        res.status(401).json({
            status : "failure",
            message : "Unauthorized"
        })
    }
};


module.exports = checkIfUserIsStudent ;