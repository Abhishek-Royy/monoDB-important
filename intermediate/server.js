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
                category: ["JS", "react", "C", "node", "express", "mongoDB"],
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

app.get("/find", async (req, res) => {
    let rd = new RegExp("^jeoraxy$", "i"); //the sign funda is tell in notes.
    let data = await mongodb.findOne({ username: rd });
    res.send(data);
});

app.get("/array", async (req, res) => {
    let data = await mongodb.find({ category: { $all: ["Java", "Aws"] } });
    res.send(data)
});

app.get("/exist", async (req, res) => {
    let existingData = await mongodb.find({ category: { $exists: true } });
    res.send(existingData);
});


    // ANY ELEMENT LENGTH CHECK FILTER
app.get("/length", async (req, res) => {
    let lenData = await mongodb.find({
        $expr: {
            $and: [
                { $gte: [{ $strLenCP: "$nickname" }, 5] },
                { lte: [{ $strLenCP: "nickname" }, 6] },
            ]
        }
    });
    res.send(lenData);
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Connect to http://localhost:${PORT}`);
});