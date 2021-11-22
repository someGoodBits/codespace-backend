const { firestore } = require("../../services/firebase-service");

function removeStudent(req,res){
	const studentID = req.body.studentID;
	const classroomID = req.body.classroomID;

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

    firestore.collection('enrolledStudents')
    .where('studentID','==',studentID)
    .where('classroomID','==',classroomID)
    .get()
    .then((snapshot)=>{
    	if(snapshot.exists){
    		firestore.collection('enrolledStudents')
    		.doc(snapshot.doc.ref).delete()
    		.then(()=>{
    			res.status(200).json({
		            status : "success",
		            message : "Student deleted from classroom"
       			})
    		})
    	}
    })
    .catch((error)=>{
    	console.error(error);
        res.status(500).json({
            status :"failure",
            message : "Unable to delete student" 
        })
    });

    
}

module.exports = removeStudent ;