const { firestore } = require("../../../services/firebase-service");

function unlike(req,res){

    const userID = req.user.uid;
    const codeID = req.user.codeID;
    
    firestore
    .collection('likes')
    .where('userID','==',userID)
    .where('codeID','==',codeID)
    .then((snapshot)=>{

        snapshot.docs[0].ref.delete();

        res.status(200).json({
            status:'success',
            message:'Unliked Code Successfully'
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

module.exports = unlike;