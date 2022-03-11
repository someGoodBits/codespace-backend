const { firestore } = require("../../services/firebase-service");

async function acceptAllJoinRequest(req,res){
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

    const requestRef =  firestore.doc(`classroom/${classroomID}/joinRequests/${studentID}`);
    const studentRef =  firestore.doc(`users/${studentID}`) ;
    const classroomRef =  firestore.doc(`classroom/${classroomID}`) ;

    let studentData   ;
    let classroomData  ;

    try {
        let studentDocRef  = await studentRef.get() ;
        let classroomDocRef = await classroomRef.get();
        studentData = studentDocRef.data();
        classroomData = classroomDocRef.data();
    } catch(error){
        res.status(400).json({
            status:"failure",
            message:error
        })
        return ;
    }
    

    requestRef.get().then((joinReqDoc)=>{
        if(joinReqDoc.exists){
            requestRef.delete()
            .then(()=>{
                const enrollRef = firestore.doc(`enrolledStudents/${studentID}`) ;
                enrollRef.get()
                .then((docRef)=>{
                    if(docRef.exists){
                        res.status(400).json({
                            status:"failure",
                            message:"Student already enrolled in class",
                        })
                    }else{
                        enrollRef.set({
                            classroomID,
                            studentID,
                            studentName : studentData.displayName,
                            enrollmentNumber : studentData.enrollmentNumber ,
                            classroomName : classroomData.classroomName,
                            classroomDescription : classroomData.classroomDescription
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
                    message : error.message
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

module.exports = acceptAllJoinRequest ;