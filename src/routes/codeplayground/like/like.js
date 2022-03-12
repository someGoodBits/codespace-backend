const { firestore } = require("../../../services/firebase-service");

function like(req,res){

    const time = Date.now();

    const data = {
        userID:req.user.uid,
        codeID:req.body.codeID,
        createdAt:time
    }

    firestore
    .collection('likes')
    .add(data)
    .then((docRef)=>{

        res.status(200).json({
            status:'success',
            message:'Liked Code Successfully'
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

module.exports = like;