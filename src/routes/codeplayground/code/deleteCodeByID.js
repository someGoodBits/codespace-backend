const { firestore } = require("../../services/firebase-service");

// todo - delete corresponding comments, replies to comments and likes

function deleteCodeByID(req,res){

    const codeID = req.params.codeID;

    firestore
    .collection('codes')
    .doc(codeID)
    .delete()
    .then(()=>{

        // deleting comments
        firestore
        .collection('comment')
        .where('codeID','==',req.body.codeID)
        .get()
        .then((snapshot)=>{
            snapshot.docs.forEach((doc) => {
                
                const commentID = doc.documentID;
                
                doc.ref.delete();  
                firestore
                .collection('commentLike')
                .where('commentID','==',commentID)
                .get()
                .then(innerSnapshot=>{
                    innerSnapshot.docs.forEach((innerDocs)=>{
                        innerDocs.ref.delete();
                    })
                })
            });
        })


        // deleting likes
        firestore
        .collection('like')
        .where('codeID','==',req.body.codeID)
        .where('userID','==',req.user.uid)
        .get()
        .then((snapshot)=>{

            snapshot.docs[0].ref.delete();

        })

        res.status(200).json({
            status:'success',
            message:'Code deleted successfully'
        })
    })
    .catch((error)=>{
        res.status(500).json({
            status:'failure',
            message:error.message
        })
    })
}

module.exports = deleteCodeByID;