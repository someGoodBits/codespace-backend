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

        // update below code after learning batched writes
        // firestore.collection('enrolledStudents')
        // .where('classroomID','==',classroomID)
        // .get()
        // .then((snapshot)=>{
        //     // batched 
        // })
        
        res.status(500).json({
            status :"failure",
            message : "Unable to delete classroom" 
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