const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const wrapAsync = require("../uitils/wrapAsync.js");
const Listing = require("../Models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");

//multer
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
 

const listingController = require("../controllers/listings.js"); 

// Index Route  // Create Route
router.route("/")
.get( wrapAsync(listingController.index))
.post(  isLoggedIn , upload.single('listing[image]') , validateListing,wrapAsync(listingController.createListing ));




// New Route
router.get("/new", isLoggedIn,listingController.newForm );
 

 // Show Route   // Update Route  // Delete Route
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put( isLoggedIn ,isOwner, upload.single('listing[image]'),validateListing,wrapAsync( listingController.updateListing))
.delete( isLoggedIn ,isOwner, wrapAsync(listingController.deleteListing));

// Edit Route
router.get("/:id/edit",isLoggedIn ,isOwner, wrapAsync(listingController.editForm));
 
 module.exports =  router;