const path = require("path") ;
const { storage, firestore } = require("../../services/firebase-service");

async function uploadFile(req,res){

	const classroomID = req.body.classroomID; 
	const postID = req.body.postID ; 

    let now = Date.now() ;

    let uploadLocation = "uploads" ;

    if(req.user.isStudent) {
        uploadLocation = "submission"
    }
    
    const fileName = `${postID}-${now}` + path.extname(req.file.originalname)

    try {
        await storage.file(`${classroomID}/${uploadLocation}/${fileName}`).createWriteStream().end(req.file.buffer)

        let data = {
            createdAt : now,
            updatedAt : now,
            fileName  : req.file.originalname,
            filePath  : `${classroomID}/${uploadLocation}/${fileName}`,
            owner     : req.user.uid,
        }

        if(req.user.isStudent) {
            data = {
                ...data,
                points:0,
                pointsAllotted:false
            }
        }

        firestore
        .collection("classroom")
        .doc(classroomID)
        .collection("posts")
        .doc(postID)
        .collection(uploadLocation)
        .add(data)
        .then(()=>{
            res.status(200).json({
                status: "success",
                message: data,
            });
        })
        .catch((error)=>{
            console.error(error.message);
            res.status(400).json({
                status: "failure",
                message: error.message,
            });
        })

    } catch(error){
        console.error(error.message);
        res.status(400).json({
            status: "failure",
            message: error.message,
        });
    }
    
    
}

module.exports = uploadFile ;