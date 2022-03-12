const { firestore } = require("../../../services/firebase-service");

function unfollow(req,res){

    const who = req.body.who;
    const whom = req.body.whom;

    firestore
    .collection('follows')
    .where('who','==',who)
    .where('whom','==',whom)
    .then((snapshot)=>{

        snapshot.docs[0].ref.delete();

        res.status(200).json({
            status:'success',
            message:'Followed Successfully'
        })
    })
    .catch(error=>{

        console.error(error);
        res.status(500).json({
            status:'failure',
            message:error.message
        })
    })
}

module.exports = unfollow;