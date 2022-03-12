const { firestore } = require("../../services/firebase-service");

function deleteComment(req,res){

    const commentID = req.body.commentID;

    firestore
    .collection('comments')
    .doc(commentID)
    .delete()
    .then(()=>{

        res.status(200).json({
            status:'success',
            message:'Comment Deleted Successfully'
        })
    })
    .catch(error=>{
        console.error(error);
        res.status(500).json({
            status:'failure',
            message:error.message
        })

    })
}

module.exports = deleteComment;