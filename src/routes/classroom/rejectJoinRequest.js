const { firestore } = require("../../services/firebase-service");

function rejectJoinRequest(req,res){
    // inp -> {studentID}
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
    .doc(studentID).delete()
    .then(()=>{
        res.status(200).json({
            status : "success",
            message : "Join request rejected"
        })
    })
    .catch((error)=>{
        console.error(error);
        res.status(500).json({
            status :"failure",
            message : error.message
        })
    })
}

module.exports = rejectJoinRequest ;