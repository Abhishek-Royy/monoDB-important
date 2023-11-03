// const express =require ("express");
// const conn=require("./session");
// const session = require("express-session")

// const app=express();

// const port=process.env.port || 8000;

// app.get("/", (req, res) => {
//     req.session.ban=true;
//     res.send("Just try session Funda..!");
// });

// app.get("/checkUserBan",(req,res)=>{
//     console.log(req.session);
//     res.send("Check the Console please..")
// })


// app.listen(port,()=>{
//     console.log(`Connect with http://localhost:${port}`);
// });

/*-----------------------------------------------------------------------*/

const express = require("express");
const session = require("express-session");

const app = express();

const port = process.env.PORT || 8000;

// Configure session middleware
app.use(
    session({
        secret: 'holumolugolu', // Replace with a secure secret key
        resave: false,
        saveUninitialized: false,
    })
);


// CREATE SESSION
app.get("/", (req, res) => {
    req.session.ban = true;
    res.send("Just trying session Funda..!");
});


// practice (READ)
/*
app.get("/checkUserBan", (req, res) => {
  console.log(req.session);
  res.send("Check the Console, please.");
});*/


// now we see how website ban us-> (READ)
app.get("/checkUserBan", (req, res) => {
    if (req.session.ban === true) {
        res.send("You are Bann for using this website right now..!")
    }
    else{
        res.send("No any Ban exist..!")
    }
    console.log(req.session)
});


// Remove the Ban (DELETE) 
app.get("/removeBan",(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.send("Ban remove successfully..!")
    })
})

app.listen(port, () => {
    console.log(`Connected to http://localhost:${port}`);
});
