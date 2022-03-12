const { firestore } = require("../../services/firebase-service");

function getCommentsByCodeID(req,res){

    firestore
    .collection('comments')
    .where('codeID','==',req.body.codeID)
    .get()
    .then((snapshot)=>{
        
        res.status(200).json({
            status:'success',
            message:snapshot.docs.map(doc=>({...doc.data(),id:doc.id}))
        })
    })
    .catch(error=>{
        res.status(400).json({
            status:'failure',
            message:error.message
        })
    })
}

module.exports = getCommentsByCodeID;