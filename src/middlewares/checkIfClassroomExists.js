const {firestore } = require("../services/firebase-service");

const checkIfClassroomExists = (req, res, next) => {

	const classroomID = req.body.classroomID;

	if(!classroomID || typeof classroomID !== 'string'){
		res.status(400).json({
			status : "failure",
			message : "Invalid classroom ID"
		})
		return ;
	}


	firestore.collection('classroom').doc(classroomID).get()
	.then((docRef)=>{
		if(docRef.exists){
			req.classroom = {...docRef.data(),classroomID:docRef.id};
			next();
		}
		else{
			res.status(400).json({
				status : "failure",
				message : "Classroom does not exists"
			})
		}
	}).catch(error=>{
		console.error(error);
		res.status(500).json({
			status : "failure",
			message : "Unable to create join request"
		})
	});


};

module.exports = checkIfClassroomExists ;