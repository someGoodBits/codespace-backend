const express = require("express") ;
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3001 ;

// app routers
const helloRouter = require("./routes/hello") ;

app.use("/",helloRouter);

app.listen(PORT,()=>{
    console.log(`Listening on PORT : ${PORT}`) ;
})