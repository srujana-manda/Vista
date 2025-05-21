const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../uitils/wrapAsync.js");
const {validateReviews, isLoggedIn, isAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");



//Reviews
//Post Route
router.post("/", isLoggedIn,  validateReviews ,wrapAsync(reviewController.createReview ));

// Delete Review Route
router.delete("/:reviewId", isLoggedIn ,isAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;

