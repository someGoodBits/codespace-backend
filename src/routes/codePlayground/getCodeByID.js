const { firestore } = require("../../services/firebase-service");

function getCodeByID(req,res){

    const postID = req.params.postID;

    firestore
    .collection('classroom')
    .doc(req.classroom.classroomID)
    .collection('posts')
    .doc(postID)
    .get()
    .then((docRef)=>{
        if(docRef.exists){
           res.status(200).json({
                status:"success",
                message : docRef.data()
            }) 
        } else {
            res.status(404).json({
                status:"failure",
                message : "Post Not Found"
            })
        }
        
    }).catch(error =>{
        console.error(error);
        res.status(400).json({
            status:"failure",
            message : error.message
        })
    })
}

module.exports = getCodeByID ;