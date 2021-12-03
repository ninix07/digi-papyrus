const express = require("express");
const router = express();
const bodyParser= require("body-parser");
const bcrypt = require("bcryptjs")
const passport= require("passport")

//users model
const User= require("../models/User")



//login page
router.get("/login",(req,res)=>{
    res.render("login");

});

//register page

router.get("/register",(req,res)=>{
    res.render("register");
})

// Register handle
router.post("/register",(req,res)=>{
  const {name, email, password, password2}= req.body;
  let errors=[];

  // checking required fields
  if (!name || !email || !password || !password2){
    errors.push({msg:"Please fill in all fields"});
  };

  //checking password match
  if(password!== password2){
    errors.push({msg:"Password didn't match"});

  };

//checking password length

if(password.length<6){
  errors.push({msg:"Password must be 6 character long"})
}

if(errors.length>0){
  res.render("register",{
    errors,
    name,
    email,
    password,
    password2
  })

}
else{
// validation passed
User.findOne({email:email})
.then(user =>{
  if(user){
    // user exists
    errors.push({msg:"Email is already registered"})
    res.render("register",{
      errors,
      name,
      email,
      password,
      password2
    });
  }else{
    const newUser= new User({
      name,
      email,
      password
    });

    // hash password
    bcrypt.genSalt(10,(err, salt)=>
    bcrypt.hash(newUser.password, salt , (err, hash)=>{
      if(err) throw err;

    // hashed password saved
    newUser.password= hash;

     //saving user info in daabase
     newUser.save()
     .then(user=>{
       req.flash("success_msg","you are now registered and can login")
       res.redirect("/users/login");
     })
     .catch(err=> console.log(err));

    }))



  }
});

}

});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports= router;
