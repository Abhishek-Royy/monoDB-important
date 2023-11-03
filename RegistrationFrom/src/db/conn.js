const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/allRegister", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex:true
}).then(() => {
    console.log("Connection Successfull..!")
}).catch((e) => {
    console.log("Unsuccessfull Connection..!", e)
})