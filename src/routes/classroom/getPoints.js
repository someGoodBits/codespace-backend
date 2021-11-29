const { firestore } = require("../../services/firebase-service");

function getPoints(req,res){

    const classroomID = req.body.classroomID;
    const postID = req.body.postID;
    const studentID = req.body.studentID;

    if(req.classroomPost.isPointsPublished){


    	firestore
	    .collection('classroom')
	    .doc(classroomID)
	    .collection('posts')
	    .doc(postID)
	    .collection('allotPoints')
	    .doc(studentID)
	    .get()
	    .then((docRef)=>{
	    	if(docRef.exist){
	    		const data = docRef.data();
	    		res.status(200).json({
	    			isPointsPublished:true,
	    			points:data.points
	    		})
	    		return;
	    	}
	    	else{
	    		res.status(200).json({
	    			isPointsPublished:false
	    		})
	    		return;
	    	}
	    })
    }
    else{

    	res.status(200).json({
    		isPointsPublished:false
    	})
    	return;
    }
        
}

module.exports = getPoints ;