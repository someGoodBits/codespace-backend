const { firestore } = require("../../services/firebase-service");

function getClassroomByID(req, res){
    const classroomID = req.params.id;
    firestore
        .collection("classroom")
        .doc(classroomID)
        .get()
        .then((docRef) => {
            res.status(200).json({
                status: "success",
                message: docRef.data(),
            });
        })
        .catch((error) => {
            res.status(400).json({
                status: "FAILURE",
                message: error.message,
            });
        });
}

module.exports = getClassroomByID ;