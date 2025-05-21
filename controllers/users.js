const User = require("../Models/user.js");
// signup
//get
module.exports.renderSignup = (req,res)=>{
    res.render("users/signup.ejs");
};

//post
module.exports.signUp = async(req,res)=>{
  try{
    let{username,email,password} = req.body;
    const newUser =  new User({username,email,password});
    const registerUser = await User.register(newUser , password);
    console.log(registerUser);
    req.login(registerUser,(err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","Welcome to Wanderlust");
    res.redirect("/listings");
    })
  }catch(err){
    req.flash("error",err.message);
    res.redirect("/signup");
  }
   
};

//login
//get
module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs")
};

//post
module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl)
     
};

//logout
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
      if(err){
       return  next(err);
      }
      req.flash("success","you are logged out");
      res.redirect("/listings");
    })
  };