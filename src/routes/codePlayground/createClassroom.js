const { firestore } = require("../../services/firebase-service");

function createClassroom(req, res) {
    if (!req.body.classroomName) {
        res.status(400).json({
            status: "failure",
            message: "Invalid entries",
        });
        return;
    }
    var data = {};
    const time = Date.now();

    data = {
        owner: req.user.uid,
        classroomName: req.body.classroomName,
        classroomDescription: req.body.classroomDescription || "",
        createdAt: time,
        updatedAt: time,
    };

    firestore
        .collection("classroom")
        .add(data)
        .then((docRef) => {
            res.status(200).json({
                status: "success",
                message: data,
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({
                status: "failure",
                message: error.message,
            });
        });
}

module.exports = createClassroom ;