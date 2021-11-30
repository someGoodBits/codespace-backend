const { firestore } = require("../../services/firebase-service");


function getJoinRequests(req,res){

	const classroomID = req.query.classroomID;

    firestore
    .collection('classroom')
    .doc(classroomID)
    .collection('joinRequests')
    .get()
    .then((snapshot)=>{

        res.status(200).json({
            status:"success",
            message : snapshot.docs.map(doc => ({...doc.data(),id:doc.id}))
        })
    }).catch(error =>{
        console.error(error);
        res.status(400).json({
            status:"failure",
            message : error.message
        })
    })
}

module.exports = getJoinRequests ;