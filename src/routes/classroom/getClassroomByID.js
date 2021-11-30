const { firestore } = require("../../services/firebase-service");

function getClassroomByID(req, res){
    const classroomID = req.classroom.classroomID ;
    firestore
        .collection("classroom")
        .doc(classroomID)
        .get()
        .then((docRef) => {
            if(docRef.exists){
                res.status(200).json({
                    status: "success",
                    message: docRef.data(),
                });
            } else {
                res.status(400).json({
                    status: "failure",
                    message: "Classroom Do Not Exists",
                });
            }
        })
        .catch((error) => {
            res.status(400).json({
                status: "failure",
                message: error.message,
            });
        });
}

module.exports = getClassroomByID ;