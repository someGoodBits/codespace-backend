const checkIfUserOwnsCode = (req, res, next) => {
    if(req.codeDoc.author === req.user.uid){
    	next();
    }
    else{
    	res.status(405).json({
    		status : "failure",
    		message : "Access denied"
    	})
    }	
};

module.exports = checkIfUserOwnsCode ;