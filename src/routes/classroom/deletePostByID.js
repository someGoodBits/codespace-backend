const { firestore } = require("../../services/firebase-service");


function deletePostByID(req,res){

	const postID = req.params.postID;
	const classroomID = req.classroom.classroomID;

	firestore
    .collection('classroom')
    .doc(classroomID)
    .collection('posts')
    .doc(postID)
    .delete()
    .then(()=>{
        res.status(200).json({
            status : "success",
            message : "Post deleted successfully"
        })
    })
    .catch((error)=>{
        console.error(error);
        res.status(500).json({
            status :"failure",
            message : error.message
        })
    })

}

module.exports = deletePostByID ;