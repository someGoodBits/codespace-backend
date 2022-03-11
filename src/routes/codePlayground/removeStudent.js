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
    	if(snapshot.docs.length > 0){
    		snapshot.docs[0].ref.delete()
    		.then(()=>{
    			res.status(200).json({
		            status : "success",
		            message : "Student deleted from classroom"
       			})
    		})
    	} else {
            res.status(400).json({
                status :"failure",
                message : "Enrollement Info Do not Exists" 
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