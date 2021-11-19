const checkIfTeacherOwnsClassroom = (req, res, next) => {
    if(req.classroom.owner === req.user.uid){
    	next();
    }
    else{
    	res.status(405).json({
    		status : "failure",
    		message : "Access denied"
    	})
    }	
};

module.exports = checkIfTeacherOwnsClassroom ;