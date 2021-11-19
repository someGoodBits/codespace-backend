const { firestore } = require("../../services/firebase-service");

function createJoinRequest(req,res){

    const classroomID = req.body.classroomID;

    firestore
    .collection('classroom')
    .doc(classroomID).collection('joinRequests')
    .doc(req.user.uid).get()
    .then(doc=>{
        if(doc.exists){
            res.status(400).json({
                status : "failure",
                message : "Join request already exists."
            })
        }
        else{
            firestore
            .collection('classroom')
            .doc(classroomID).collection('joinRequests')
            .doc(req.user.uid).set({
                createdAt : Date.now().toString()
            })
            .then(()=>{
                res.status(400).json({
                    status : "success",
                    message : "Join request sent"
                })
            })
            .catch((error)=>{
                console.error(error);
                res.status(400).json({
                    status : "failure",
                    message : "Unable to create join request."
                })
            });
        }
    })
}

module.exports = createJoinRequest ;