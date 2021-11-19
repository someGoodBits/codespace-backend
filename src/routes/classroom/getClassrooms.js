const { firestore } = require("../../services/firebase-service");

function getAllClassrooms(req,res){
    firestore.collection('classroom').where("owner","==",req.user.uid).get()
    .then((snapshot)=>{

        res.status(200).json({
            status:"success",
            message : snapshot.docs.map(doc => ({...doc.data(),id:doc.id}))
        })
    }).catch(error =>{
        console.error(error);
        res.status(400).json({
            status:"FAILURE",
            message : error.message
        })
    })
}

module.exports = getAllClassrooms ;