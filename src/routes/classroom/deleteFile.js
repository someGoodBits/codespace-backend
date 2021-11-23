const path = require("path") ;
const { storage, firestore } = require("../../services/firebase-service");

function deleteFile(req,res){
    // 
	const filePath = req.body.filePath; 
	const uploadID = req.body.uploadID; 
    
    let fileRef =  firestore
    .collection("classroom")
    .doc(classroomID)
    .collection("posts")
    .doc(postID)
    .collection("uploads")
    .doc(uploadID);
   
    fileRef.get().then((docRef)=>{
        if(docRef.exists){
            if(req.user.uid === docRef.data().owner){
                storage.file(filePath).exists().then(()=>{
                    storage.file(filePath).delete().then(()=>{
                        res.status(405).json({
                            status: "FAILURE",
                            message: "Access Denied",
                        });
                    })
                })
            } else {
                res.status(405).json({
                    status: "FAILURE",
                    message: "Access Denied",
                });
            }
        } else {
            res.status(405).json({
                status: "FAILURE",
                message: "File Do Not Exist",
            });
        }
    })
    .catch((error)=>{
        console.error(error.message);
        res.status(400).json({
            status: "FAILURE",
            message: error.message,
        });
    }) 
    
}

module.exports = deleteFile ;