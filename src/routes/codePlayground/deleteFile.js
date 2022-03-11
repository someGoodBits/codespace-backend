const path = require("path") ;
const { storage, firestore } = require("../../services/firebase-service");

function deleteFile(req,res){
    // 
	const filePath = req.body.filePath;
    const postID = req.body.postID; 
	const uploadID = req.body.uploadID; 
    const classroomID = req.body.classroomID;
    let uploadLocation = 'uploads';

    if(req.user.isStudent) {
        uploadLocation = "submission"
    }
    
    let fileRef =  firestore
    .collection("classroom")
    .doc(classroomID)
    .collection("posts")
    .doc(postID)
    .collection(`${uploadLocation}`)
    .doc(uploadID);
   
    fileRef.get().then((docRef)=>{
        if(docRef.exists){

                fileRef.delete()
                .then(()=>{
                    console.log('Deleted!')
                })
            
                storage.file(filePath)
                .exists()
                .then(()=>{
                    storage
                    .file(filePath)
                    .delete()
                    .then(()=>{
                        res.status(405).json({
                            status: "success",
                            message: "File deleted",
                        });
                    })
                })

            // else {
            //     res.status(405).json({
            //         status: "failure",
            //         message: "Access Denied",
            //     });
            // }
        } else {
            res.status(405).json({
                status: "failure",
                message: "File Do Not Exist",
            });
        }
    })
    .catch((error)=>{
        console.error(error.message);
        res.status(400).json({
            status: "failure",
            message: error.message,
        });
    }) 
    
}

module.exports = deleteFile ;