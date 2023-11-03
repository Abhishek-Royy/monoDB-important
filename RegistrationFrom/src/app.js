const express = require("express");
const path = require("path")
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcrypt");
require("./db/conn")
const Register = require("./models/registers")

const port = process.env.PORT || 3000

const static_path = path.join(__dirname, "../public")
const partial_path = path.join(__dirname, "../partials")

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static(static_path))
app.set("view engine", "hbs")
hbs.registerPartials(partial_path)


// console.log(path.join(__dirname,"../public"))

app.get("/index", (req, res) => {
    res.render("index")
});

app.get("/register", (req, res) => {
    res.render("register")
});

app.get("/login", (req, res) => {
    res.render("login")
});

// // CREATE NEW USER IN DATABASE

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                age: req.body.age,
                password: password,
                cpassword: cpassword
            })
            const registered = await registerEmployee.save();
            res.status(201).render("index");
        }
        else {
            res.send("Password are not matching..!")
        }
    } catch (error) {
        res.status(400).send(error)
    }
});



app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;


        const useremail = await Register.findOne({ email: email });

        const isMatch =await bcrypt.compare(password, useremail.password);

        if (isMatch) {
            res.status(201).render("index");
        }
        else {
            res.semd("Incorrect Password..!")
        }

    } catch (error) {
        res.status(400).send("Invalid Details...")
    }
});


// const jwt = require("jsonwebtoken");

// const createToken = async () => {
//     const token = await jwt.sign({ _id: "650aff4dafa04d498b6ab370" }, "mynameisabhishekroymernstackdeveloper");
//     console.log(token);

//     const userVar = jwt.verify(token,"mynameisabhishekroymernstackdeveloper")
//     console.log(userVar)
// }

// createToken();

app.listen(port, () => {
    console.log(`Server is connected with ${port}`)
})