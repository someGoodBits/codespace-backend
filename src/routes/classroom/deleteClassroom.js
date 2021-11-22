const { firestore } = require("../../services/firebase-service");

function deleteClassroom(req,res){
	const classroomID = req.body.classroomID;


    if(!classroomID){
        res.status(400).json({
            status :"failure",
            message : "Invalid classroomID" 
        })
        return;
    }

    firestore.collection('classroom')
    .doc(classroomID)
    .delete()
    .then(()=>{
        firestore.collection('enrolledStudents')
        .where('classroomID','==',classroomID)
        .get()
        .then((snapshot)=>{
            // batched 
        })
    })
    .catch(error=>{
        console.error(error);
        res.status(500).json({
            status :"failure",
            message : "Unable to delete classroom" 
        })
    })

    
}

module.exports = deleteClassroom ;