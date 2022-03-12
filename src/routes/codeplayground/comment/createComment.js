const { firestore } = require("../../../services/firebase-service");

function createComment(req,res){

    const time = Date.now();
    const data = {
        author:req.user.uid,
        content:req.body.content,
        replyTo:req.body.replyTo,
        codeID:req.body.codeID,
        createdAt:time,
    }

    firestore
    .collection('comments')
    .add(data)
    .then(docRef=>{
        
        res.status(200).json({
            status:'success',
            message:data 
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

module.exports = createComment;