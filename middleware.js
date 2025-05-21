const Listing = require("./Models/listing.js");
const ExpressError = require("./uitils/ExpressError.js");
const {listingSchema , reviewSchema} = require("./schema.js");
const Review = require("./Models/review.js");

//logged middleware
module.exports.isLoggedIn = (req,res,next) =>{

    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must Logged in to create listing!");
       return  res.redirect("/login");
    }
    next();
}

//directpage middleware
module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

//owner middleware
module.exports.isOwner = async (req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);

    if(!listing.owner.equals(res.locals.currUser._id)){
       req.flash("error","you are not owner of the listing");
       return res.redirect(`/listings/${id}`);
    }
    next();
}

//listing middleware
module.exports.validateListing = (req,res,next) =>{
    const {error} =  listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el) => el.message).join(",");
       throw new ExpressError(400, errMsg);
    }else{
        next();
    }

}

//review middleware

//Validation for review middleware
module.exports.validateReviews = (req,res,next) =>{
    const {error} =  reviewSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el) => el.message).join(",");
       throw new ExpressError(400, errMsg);
    }else{
        next();
    }

} 

//checking author for reviews
module.exports.isAuthor = async (req,res,next) => {
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
       req.flash("error","you are not the author of this review");
       return res.redirect(`/listings/${id}`);
    }
    next();
}

