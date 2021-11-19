const { firestore } = require("../../services/firebase-service");

function createClassroom(req, res) {
    if (!req.body.classroomName || typeof req.body.classroomDescription === "string") {
        res.status(400).json({
            status: "FAILURE",
            message: "Invalid entries",
        });
        return;
    }
    var data = {};
    const time = Date.now();

    data = {
        owner: req.user.uid,
        classroomName: req.body.classroomName,
        classroomDescription: req.body.classroomDescription,
        createdAt: time,
        updatedAt: time,
    };

    firestore
        .collection("classroom")
        .add(data)
        .then((docRef) => {
            res.status(200).json({
                status: "success",
                message: docRef.data(),
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                status: "FAILURE",
                message: error.message,
            });
        });
}

module.exports = createClassroom ;