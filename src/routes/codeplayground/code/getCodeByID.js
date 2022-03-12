const { firestore } = require("../../services/firebase-service");

// todo -  get all likes, comments and replies to comments as well

function getCodeByID(req,res){

    const codeID = req.params.codeID;

    firestore
    .collection('codes')
    .doc(codeID)
    .get()
    .then((docRef)=>{
        if(docRef.exists){
            res.status(200).json({
                status:'success',
                message:docRef.data()
            })
        }
        else{
            res.status(404).json({
                status:'failure',
                message:'Code Not Found'
            })
        }
    })
    .catch(error=>{
        console.error(error);
        res.status(400).json({
            status:'failure',
            message:error.message
        })
    })
}

module.exports  = getCodeByID;