const { firestore } = require("../../services/firebase-service");

function getUserProfile(req,res){

	const uid = req.user.uid;

	firestore
	.collection('users')
	.doc(uid)
	.get()
	.then((docRef)=>{
		res.status(200).json({
            status: "success",
            message: docRef.data(),
        });
	})
	.catch((error)=>{
		res.status(400).json({
            status: "failure",
            message: error.message,
        });
	})

}

module.exports =  getUserProfile;