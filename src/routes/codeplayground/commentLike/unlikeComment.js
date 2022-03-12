const { firestore } = require("../../../services/firebase-service");

function unlikeComment(req,res){

    const userID = req.user.uid;
    const commentID = req.user.commentID;
    
    firestore
    .collection('likes')
    .where('userID','==',userID)
    .where('commentID','==',commentID)
    .then((snapshot)=>{

        snapshot.docs[0].ref.delete();

        res.status(200).json({
            status:'success',
            message:'Unliked Comment Successfully'
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

module.exports = unlikeComment;