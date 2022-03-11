const path = require("path") ;
const { storage, firestore } = require("../../services/firebase-service");


function getSubmissionByStudentID(req,res){

	const postID = req.body.postID; 
	const classroomID = req.body.classroomID;
    const submissionID = req.params.submissionID;
	let uploadLocation = 'submission';

	let fileRef =  firestore
    .collection("classroom")
    .doc(classroomID)
    .collection("posts")
    .doc(postID)
    .collection(`${uploadLocation}`)
    .doc(submissionID)
    .get()
    .then((docRef)=>{
        res.status(200).json({
            status: "success",
            message: docRef.data(),
        });    	
    })
    .catch((error)=>{
    	console.error(error);
        res.status(400).json({
            status:"failure",
            message : error.message
        })
    })
}


module.exports = getSubmissionByStudentID ; 