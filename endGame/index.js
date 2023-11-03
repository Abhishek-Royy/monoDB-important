const express = require("express");
const app = express();
const userModel = require("./database");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello guys")
});

//  CREATE OPERATION
app.get("/create", async (req, res) => {
    const allData = await userModel.create([
        {
            username: "Shubman",
            name: "Shubman Gill",
            age: 25
        },
        {
            username: "Alexa",
            name: "Leo Murgan",
            age: 21
        },
        {
            username: "Sara",
            name: "Sara Arora",
            age: 22
        },
        {
            username: "Gadot",
            name: "Gal gadot",
            age: 56
        },
    ]);
    res.send(allData)
});

//  READ OPERATION
// app.get("/read",async(req,res)=>{
//     const allData=await userModel.find();
//     // const allData=await userModel.findOne({username: "Gadot"})
//     res.send(allData);
// });

// DELETE OPERATION
// app.get("/delete", async (req, res) => {
//     const deletedData = await userModel.findOneAndDelete({
//         username:"Sara"
//     });
//     res.send(deletedData);
// });





app.listen(port, () => {
    console.log(`Connection Setup Successfull with http://localhost:${port} `)
})