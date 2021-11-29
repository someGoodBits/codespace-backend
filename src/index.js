const express = require("express") ;
const app = express();
const cors = require('cors')

// Todo server side validation

require('dotenv').config()
const PORT = process.env.PORT || 3001 ;
app.use(cors());

// app routers
const signupRouter = require("./routes/signup/signupRouter");
const classroomRouter = require("./routes/classroom/classroomRouter");
const userRouter = require("./routes/user/userRouter.js");

app.use("/signup",signupRouter);
app.use("/classroom",classroomRouter);
app.use("/user",userRouter)

// Start Server
app.listen(PORT,()=>{
    console.log(`Listening on PORT : ${PORT}`) ;
})

