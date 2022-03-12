const { firestore } = require("../../services/firebase-service");

// todo -  thumbnail saving

function updateCodeByID(req,res){

    const codeID = req.body.codeID;
    const data = {
        updatedAt:Date.now(),
        HTML : req.body.HTML,
        CSS : req.body.CSS,
        JS : req.body.JS,
        thumbnail : ""
    };
    

    firestore
    .collection('codes')
    .doc(codeID)
    .update(data)
    .then((docRef)=>{
        res.status(200).json({
            status:'success',
            message:data
        })
    })
    .catch((error)=>{
        console.error(error);
        res.status(400).json({
            status:'failure',
            message:error.message
        })
    })
}

module.exports = updateCodeByID;