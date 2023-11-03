const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/studentsAPI", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connection is Successfull..!")
})
.catch((e)=>{
    console.log("Connection UnSeccessfull..!")
})