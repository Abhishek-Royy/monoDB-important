// const express = require("express");
// const passport = require("passport");
// const session = require("express-session");

// const app = express();
// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/user");

// app.set('view engine', 'ejs');

// // Express-Session
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: "hello hello guys guys"
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser(usersRouter.serializeUser())
// passport.deserializeUser(usersRouter.deserializeUser());


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`connect to http://localhost:${PORT}`);
// })

const express = require("express");
const passport = require("passport");
const session = require("express-session");

const app = express();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");

app.set('view engine', 'ejs');

// Express-Session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "hello hello guys guys"
}));
app.use(passport.initialize());
app.use(passport.session());

// Correct usage of serializeUser and deserializeUser
passport.serializeUser(usersRouter.serializeUser);
passport.deserializeUser(usersRouter.deserializeUser);

app.use("/", indexRouter);
app.use("/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Connected to http://localhost:${PORT}`);
});
