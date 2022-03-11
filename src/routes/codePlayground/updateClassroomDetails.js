const { firestore } = require("../../services/firebase-service");

function updateClassroomDetails(req,res){
    if(!req.body.classroomName || typeof req.body.classroomDescription !== "string"){
        res.status(400).json({
            status:"failure",
            message : "Invalid entries"
        })
        return;
    }

    var data = {
        classroomName:req.body.classroomName,
        classroomDescription:req.body.classroomDescription,
        updatedAt: Date.now()
    }

    firestore.collection('classroom').doc(req.classroom.classroomID).update(data)
    .then((docRef)=>{
        res.status(200).json({
            status:"success",
            message : data
        })
    }).catch(error =>{
        console.error(error);
        res.status(400).json({
            status:"failure",
            message : error.message
        })
    })
}

module.exports = updateClassroomDetails ;