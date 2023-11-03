const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mongoadvance");

const userSchema = mongoose.Schema({
    username: String,
    nickname: String,
    description: String,
    category: {
        type: Array,
        default: []
    },
    exactdate: {
        type: Date,
        default: Date.now()
    },
});

module.exports=mongoose.model("user",userSchema);