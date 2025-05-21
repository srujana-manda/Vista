const Listing = require("../Models/listing.js");
const Review = require("../Models/review.js"); 


//create
module.exports.createReview = async (req,res)=>{

 let listing =  await  Listing.findById(req.params.id);
 if (!listing) {
    return res.status(404).send("Listing not found.");
  }
 let newReview = new Review(req.body.review);
  newReview.author = req.user._id;

 listing.reviews.push(newReview);

 await newReview.save();
 await listing.save();

//  console.log("new review saved");
//  res.send("reviewed saved succesfully");
req.flash("success","Review Added!");

res.redirect(`/listings/${listing._id}`);
}

//delete
module.exports.deleteReview = async (req,res) => {
    let {id , reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Review Deleted!");

    res.redirect(`/listings/${id}`);
};