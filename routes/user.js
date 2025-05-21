const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const wrapAsync = require("../uitils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const usercontroller = require("../controllers/users.js");

//SignUp
//Get Route  //Post Route
router.route("/signup")
.get(usercontroller.renderSignup)
.post(wrapAsync( usercontroller.signUp));


//Login
//get route  //post route
router.route("/login")
.get(usercontroller.renderLogin)
.post( saveRedirectUrl, passport.authenticate("local",{ failureRedirect: "/login" , failureFlash: true }), wrapAsync(usercontroller.login))

//logout
router.get("/logout", usercontroller.logout);

module.exports = router;