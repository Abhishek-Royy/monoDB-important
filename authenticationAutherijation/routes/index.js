// const express = require("express");

// const router = express.Router();
// const passport = require("passport");
// const localStrategy = require("passport-local");
// const userModel = require("./user");



// passport.use(new localStrategy(userModel.authenticate()));

// router.get("/", (req, res) => {
//     res.render("index");
// })

// router.get("/profile", (req, res) => {
//     res.send("Wellcome to /Profile routes..!")
// });

// //register route
// router.post('/register', (req, res) => {
//     let userData = new userModel({
//         username: req.body.username,
//         secret: req.body.secret
//     });

//     userModel.register(userData, req.body.password)
//         .then(function (registeredUser) {
//             passport.authenticate("local")(req, res, () => {
//                 res.redirect('/profile');
//             })
//         })
// })

// // Code for login
// router.post('/login', passport.authenticate('local', {
//     successRedirect: "/profile",
//     failureRedirect: "/login"
// }),
//     (req, res) => { });



// // Middleware
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/')
// };

// // Code for logout
// router.get('/logout', (req, res, next) => {
//     req.logOut((err) => {
//         if (err) {
//             return next(err);
//         };
//         res.redirect('/');
//     });
// });



// module.exports=router; 


const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; // Corrected import
const userModel = require("./user");

const bodyParser = require("body-parser"); // Added body parser

// Configure body parser
router.use(bodyParser.urlencoded({ extended: true }));

passport.use(new LocalStrategy(userModel.authenticate()));

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.send("Welcome to /Profile route!");
});

// Register route
router.post('/register', (req, res) => {
  const username = req.body.username;
  const secret = req.body.secret;
  const password = req.body.password;

  if (!username || !secret || !password) {
    return res.status(400).send("Please provide all required fields.");
  }

  const userData = new userModel({
    username: username,
    secret: secret
  });

  userModel.register(userData, password, (err, registeredUser) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Registration failed.");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect('/profile');
    });
  });
});

// Code for login
router.post('/login', passport.authenticate('local', {
  successRedirect: "/profile",
  failureRedirect: "/login"
}));

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

// Code for logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
