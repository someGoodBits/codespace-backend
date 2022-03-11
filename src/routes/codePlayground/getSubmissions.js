const path = require("path") ;
const { storage, firestore } = require("../../services/firebase-service");


function getSubmissions(req,res){

	const postID = req.body.postID; 
	const classroomID = req.body.classroomID;
	let uploadLocation = 'submission';

	let fileRef =  firestore
    .collection("classroom")
    .doc(classroomID)
    .collection("posts")
    .doc(postID)
    .collection(`${uploadLocation}`)

	if(req.user.isTeacher === true){
		fileRef
		.get()
		.then((snapshot)=>{

	    	res.status(200).json({
	    		status:"success",
	    		message : snapshot.docs.map((doc)=>doc.data())
	    	})
	    })
    	.catch((error)=>{
	    	console.error(error);
	        res.status(400).json({
	            status:"failure",
	            message : error.message
	        })
   		})
	}
	else if(req.user.isStudent === true){
		const studentID = req.user.uid;
		fileRef.where('owner','==',studentID).get()
		.then((snapshot)=>{
			res.status(200).json({
				status : 'success',
				message : snapshot.docs.map((doc)=>doc.data())
			})
		})
		.catch((error)=>{
	    	console.error(error);
	        res.status(400).json({
	            status:"failure",
	            message : error.message
	        })
	    })
	}	
}


module.exports = getSubmissions ; 