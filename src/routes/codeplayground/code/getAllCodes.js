const { firestore } = require("../../services/firebase-service");

// todo - get all comments and likes on code    

function getAllCodes(req,res){

    firestore
    .collection('codes')
    .where('author','==',req.user.uid)
    .get()
    .then((snapshot)=>{
        res.status(200).json({
            status:'success',
            message:snapshot.docs.map(doc => ({...doc.data(),id:doc.id}))
        })
    })
    .catch((error)=>{
        res.status(400).json({
            status:'failure',
            message:error.message
        })
    })
}

module.exports = getAllCodes;