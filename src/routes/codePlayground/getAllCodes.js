const { firestore } = require("../../services/firebase-service");

// todo check only teachers and enrolled students can access



function getAllCodes(req,res){

    firestore
    .collection('classroom')
    .doc(req.classroom.classroomID)
    .collection('posts')
    .get()
    .then((snapshot)=>{

        res.status(200).json({
            status:"success",
            message : snapshot.docs.map(doc => ({...doc.data(),postID:doc.id}))
        })
    }).catch(error =>{
        console.error(error);
        res.status(400).json({
            status:"failure",
            message : error.message
        })
    })
}

module.exports = getAllCodes ;