const { firestore } = require("../../services/firebase-service");

function createJoinRequest(req,res){

    const classroomID = req.body.classroomID;
    const studentID = req.user.uid ;

    const requestRef = firestore.doc(`classroom/${classroomID}/joinRequests/${studentID}`);
    
    requestRef.get()
    .then(doc=>{
        if(doc.exists){
            res.status(400).json({
                status : "failure",
                message : "Join request already exists."
            })
        }
        else{
            requestRef.set({
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