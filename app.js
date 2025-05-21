if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}


const express = require("express");
const mongoose = require("mongoose");
const  path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./uitils/ExpressError.js");
const Review = require("./Models/review.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/user.js");


//routes
const listingRouter = require("./routes/listing.js");
const  reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const app = express();

app.set("view engine" , "ejs");
app.use(express.json());
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


// mongoose connected

const dbUrl = process.env.ATLASDB_URL;
main()
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log(err));

async function main(){
   await mongoose.connect(dbUrl);
}

//connect-mongo
const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error",()=>{
    console.log("ERROR in mongo session store")
})

//sessions
const sessionOptions =  {
    store,
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    }
};


app.use(session(sessionOptions));
app.use(flash());

//passport middlware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware for flash
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   res.locals.currUser = req.user;
    next();
})

// Route for Listings
app.use("/listings" , listingRouter);

//Route for Reviews
app.use("/listings/:id/reviews", reviewRouter);

//Route for users
app.use("/",userRouter);


app.all(/.*/,(req,res,next)=>{
   next(new ExpressError(404,"page not found"));
})

//Middle ware = error handling

app.use((err,req,res,next)=>{
    let{statusCode =500, message="something went wrong"} = err;
    res.status(statusCode).render("error.ejs",{message});
   // res.status(statusCode).send(message);
})



app.listen(8080,()=>{
    console.log("app is listening at port = 8080");
})