//imports
const express = require("express");
// const expressLayouts= require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();

// passport config
require("./config/passport.js")(passport);



const PORT = 2000;

// DB config
const db = require(__dirname + "/config/keys.js").MongoURI;

// connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));


//EJS
// app.use(expressLayouts);
app.set("view engine", "ejs");

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//exress session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



//routes
app.use("/", require(__dirname + "/routes/index.js"));

app.use("/users", require(__dirname + "/routes/users.js"));



app.listen(PORT, () => {
  console.log("the app is running on port " + PORT);
});
