const express=require("express");
const app=express();
const Student=require("./models/students")
require("./database/conn");
const port=process.env.PORT || 3000;

app.use(express.json());    // convert json format into readable format..

// app.get("/",(req,res)=>{        //successfull connection and access data..
//     res.send("Hello from the other side..!")
// })

app.post("/students",(req,res)=>{
    const user=new Student(req.body)
    console.log(req.body)
    // res.send("Hello from the other side..!")
    user.save().then(()=>{
        res.send(user);
    }).catch((e)=>{
        res.send(e)
    })
})

app.listen(port,()=>{
    console.log(`Connection setup successfull with ${port}`)
})
