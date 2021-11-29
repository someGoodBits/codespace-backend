const { firestore, auth } = require("../../services/firebase-service");

function updateUserProfile(req,res){

	const uid = req.user.uid;
	const displayName = req.body.displayName;

	if(req.user.isStudent){
		const enrollmentNumber = req.body.enrollmentNumber;
		var data = {
			displayName,
			enrollmentNumber
		};

		firestore
		.collection('users')
		.doc(uid)
		.update(data)
		.then((docRef)=>{

			auth.updateUser(uid,{
				displayName:displayName
			})
			.then(()=>{
				res.status(200).json({
		            status:"success",
		            message : data
		        })
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

	else if(req.user.isTeacher){
		var data = {displayName};
		if(!displayName){
			res.status(400).json({
				status:"failure",
				message:"Invalid Name"
			});
		}
		auth.updateUser(uid,{
			displayName
		})
		.then(()=>{
			res.status(200).json({
	            status:"success",
	            message : data
	        })
		})
		.catch((error)=>{
			res.status(400).json({
	            status:"failure",
	            message : error.message
	        })
		})
	}
	

}

module.exports =  updateUserProfile;