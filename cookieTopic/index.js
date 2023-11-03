const express = require("express");
const cookie = require("cookie-parser");
const cookieParser = require("cookie-parser");

const app=express();

// SETUP COOKIE-PARSER
app.use(cookieParser());

// CREATE COOKIE
app.get("/",(req,res)=>{
    res.cookie("age",21);
    res.send("Cookie setup practice..!")
});

// READ COOKIE
app.get("/readCookie",(req,res)=>{
    console.log(req.cookies);
    res.send("Watch on Console..!")
});

// DELETE COOKIE
app.get("/removeCookie",(req,res)=>{
    res.clearCookie("age");
    res.send("Cookie cleare Done..!")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Successfully connect with http://localhost:${PORT}`);
})