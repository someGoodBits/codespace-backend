const { firestore } = require("../../services/firebase-service");

function acceptJoinRequest(req,res){
    const studentID = req.body.studentID
    const classroomID = req.body.classroomID

    if(!studentID){
        res.status(400).json({
            status :"failure",
            message : "Invalid studentID" 
        })
        return;
    }

    if(!classroomID){
        res.status(400).json({
            status :"failure",
            message : "Invalid classroomID" 
        })
        return;
    }

    firestore
    .collection('classroom')
    .doc(classroomID).collection('joinRequests')
    .doc(studentID).get().then((joinReqDoc)=>{
        if(joinReqDoc.exists){
            firestore
            .collection('classroom')
            .doc(classroomID).collection('joinRequests')
            .doc(studentID).delete()
            .then(()=>{
                 firestore
                .collection('enrolledStudents')
                .doc(studentID)
                .get()
                .then((docRef)=>{
                    if(docRef.exists){
                        res.status(400).json({
                            status:"failure",
                            message:"Student already enrolled in class"
                        })
                    }else{
                        firestore
                        .collection('enrolledStudents')
                        .doc(studentID).set({
                            classroomID,
                            studentID
                        }).then(()=>{
                            res.status(200).json({
                                status : "success",
                                message : "Join request accepted"
                            })
                        })
                    }
                })
            })
            .catch((error)=>{
                console.error(error);
                res.status(500).json({
                    status :"failure",
                    message : "Unable to accept join request" 
                })
            })
        } else {
            res.status(400).json({
                status : "failure",
                message : "Unable to find Join request"
            })
        }
    })
}

module.exports = acceptJoinRequest ;