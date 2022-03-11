const { firestore } = require("../services/firebase-service");

const checkIfCodeExists = (req, res, next) => {
    const codeID = req.body.codeID;

    if (!codeID || typeof codeID !== "string") {
        res.status(400).json({
            status: "failure",
            message: "Invalid Code ID",
        });
        return;
    }

    firestore
        .collection("codes")
        .doc(codeID)
        .get()
        .then((docRef) => {
            if (docRef.exists) {
                req.codeDoc = { ...docRef.data(), codeID: docRef.id };
                next();
            } else {
                res.status(400).json({
                    status: "failure",
                    message: "Code does not exists",
                });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                status: "failure",
                message: "Unable to fetch code",
            });
        });
};

module.exports = checkIfCodeExists;
