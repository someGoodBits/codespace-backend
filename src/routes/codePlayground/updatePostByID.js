const { firestore } = require("../../services/firebase-service");

// todo add attachments
// send classroomID

function updatePostByID(req,res){
    const classroomID = req.body.classroomID; 
	const postID = req.body.postID; 
	var data = {};
    const time = Date.now();
    data = {
        description: req.body.description,
        updatedAt: time,
    };

    if(req.body.postType === 'ANNOUNCEMENT'){

    	firestore
    	.collection('classroom')
    	.doc(classroomID)
    	.collection('posts')
        .doc(postID)
    	.update(data)
    	.then((docRef)=>{
    		res.status(200).json({
                status: "success",
                message: data,
            });
    	})
    	.catch((error)=>{
    		console.error(error);
            res.status(500).json({
                status: "failure",
                message: error.message,
            });
    	})
    }
    else if (req.body.postType === 'ASSIGNMENT'){
    	data = {...data, 
    		maxPoints : req.body.maxPoints,
    		deadline : req.body.deadline,
    		submissionOpen : req.body.submissionOpen
    	};

    	firestore
    	.collection('classroom')
    	.doc(classroomID)
    	.collection('posts')
        .doc(postID)
    	.update(data)
    	.then((docRef)=>{
    		res.status(200).json({
                status: "success",
                message: data,
            });
    	})
    	.catch((error)=>{
    		console.error(error);
            res.status(400).json({
                status: "failure",
                message: error.message,
            });
    	})
    }

    else{
    	res.status(400).json({
    		status : "failure",
    		message : "Invalid postType"
    	})
    }	
}

module.exports = updatePostByID ;