const { firestore } = require("../../../services/firebase-service");

// todo thumbnail saving


function createCode(req,res){
    
    const time = Date.now();
    
    var data = {
        author:req.user.uid,
        HTML: req.body.HTML,
        CSS:req.body.CSS,
        JS:req.body.JS,
        thumbnail:'',
        createdAt: time,
        updatedAt: time,
    };

    
    
    firestore
    .collection('codes')
    .add(data)
    .then((docRef)=>{

        const codeID = docRef.id;
        // doubt
        const filename = `${codeID}`;

        storage.file('codes')
        .createWriteStream()
        .end(req.file.buffer)
        .then(()=>{
            firestore
            .collection('codes')
            .update({thumbnail : `codes/${filename}`})
            .then(()=>{

                res.status(200).json({
                    status:"success",
                    message:data
                });
            })
            
        })
    })
    .catch((error)=>{
        console.error(error);
        res.status(500).json({
            status:"failure",
            message:error.message
        });
    })
}

module.exports = createCode;