const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const employeeSchema = new mongoose.Schema({

    // CREATE SCHEMA + DATABASE

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    }
})


employeeSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the current password is ${this.password}`);
        this.cpassword=undefined;
    }
    next();
})
// NOW CREATE COLLECTION


const Register = new mongoose.model("Register", employeeSchema)

module.exports = Register