const {firestore } = require("../services/firebase-service");


const checkIfPostExists = (req, res, next) => {

	const postID = req.body.postID;
	const classroomID = req.body.classroomID;

	if(!postID || typeof postID !== 'string'){
		res.status(400).json({
			status : "failure",
			message : "Invalid post ID"
		})
		return ;
	}

	firestore
	.collection('classroom')
	.doc(classroomID)
	.collection('posts')
	.doc(postID)
	.get()
	.then((docRef)=>{
		if(docRef.exists){
			req.classroomPost = {...docRef.data(),postID:docRef.id};
			next();
		}
		else{
			res.status(400).json({
				status : "failure",
				message : "Post does not exists"
			})
		}
	}).catch(error=>{
		console.error(error);
		res.status(500).json({
			status : "failure",
			message : "Unable to fetch post"
		})
	});


};

module.exports = checkIfPostExists ;