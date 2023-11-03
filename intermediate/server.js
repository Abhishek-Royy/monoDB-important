const express = require("express");
const mongodb = require("./mongo");

const app = express();

app.get("/", (req, res) => {
    res.send("Uses the routes alll")
});

app.get("/create", async (req, res) => {
    try {
        const userModel = await mongodb.create(
            {
                username: "alexAbhishek",
                nickname: "Abhi",
                description: "I am a MERN stack Developer, I am love to do Coding..",
                category: ["js", "react", "C", "Java", "node", "express", "mongoDB"],
            },
            {
                username: "jeoRaxy",
                nickname: "Raxon",
                description: "I am a Software Developer, I am love to do Coding..",
                category: ["Java", "OOPS", "C++", "OS", "DBMS"],
            },
            {
                username: "binayJod",
                nickname: "binay",
                description: "I am a Ethical Hacker, I am love to do Coding & Hacking..",
                category: ["JS", "Java", "Python", "Kali Linux", "DJango"],
            },
            {
                username: "jhonCatlin",
                nickname: "Jhony",
                description: "I am a Cloud Enginner, I am love to do Coding & Cloud Computing..",
                category: ["Java", "C++", "AWT", "Google Cloud", "Aws"],
            },
        );
        res.send(userModel);

    } catch (error) {
        console.log(error)
            ;
    }
});

app.get("/search",async (req,res)=>{
    const data=new RegExp("Raxon",'i');
    const findData=await mongodb.find({username:data});
    res.send(findData);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Connect to http://localhost:${PORT}`);
});