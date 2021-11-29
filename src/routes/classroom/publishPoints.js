const { firestore } = require("../../services/firebase-service");

function publishPoints(req,res){

    const classroomID = req.body.classroomID;
    const postID = req.body.postID;
    const data = {
        pointsPublished:true
    }

    firestore
    .collection('classroom')
    .doc(classroomID)
    .collection('posts')
    .doc(postID)
    .update(data)
    .then((docRef)=>{
        res.status(400).json({
            status : "success",
            message : data
        })
    })
    .catch((error)=>{
        res.status(500).json({
            status : "failure",
            message : "Unable to publish points"
        })
    })

    
}

module.exports = publishPoints ;