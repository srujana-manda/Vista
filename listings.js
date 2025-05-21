const Listing = require("../Models/listing.js");
const mongoose = require("mongoose");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});

//index
module.exports.index = async (req, res) => {
    const { category, search } = req.query;  // Extract 'category' and 'search' from URL query parameters
    let filter = {};    
    
    // Initialize an empty filter object for MongoDB query

    
    // If 'category' exists in the query, add it as a filter condition
    if (category) {
        filter.category = category;
    }

    // If 'search' exists in the query, add a filter to search for listings
    // where either 'location' or 'country' fields match the search term (case-insensitive)
    if (search) {
        filter.$or = [
            { location: new RegExp(search, 'i') },   // Regex for case-insensitive match on 'location'
            { country: new RegExp(search, 'i') }     // Regex for case-insensitive match on 'country'
        ];
    }

    // Query the database for listings matching the built filter
    const allListings = await Listing.find(filter);

    // Render the 'listings/index.ejs' view, passing the retrieved listings as 'allListings'
    res.render("listings/index.ejs", { allListings , category });
};


//new
module.exports.newForm =  (req,res)=>{
      res.render("listings/new.ejs");
}

//show
module.exports.showListing = async (req,res) => {
     let {id} = req.params;

     if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash("error", "Invalid listing ID.");
        return res.redirect("/listings");
    }

     const listing = await Listing.findById(id).populate({path:"reviews" , populate:{ path: "author"},}).populate("owner");
     if(!listing){
        req.flash("error","Listing you requested is not exist ");
        return res.redirect("/listings");
     }
     res.render("listings/show.ejs",{listing});
 };

 //create
module.exports.createListing = async (req,res,next) =>{

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      }).send()


       let url =  req.file.path;
       let filename = req.file.filename;    
          const newListing =  new Listing(req.body.listing);
          newListing.owner = req.user._id;
          newListing.image = {url,filename};
         newListing.geometry = {
        type: "Point",
           coordinates: response.body.features[0].geometry.coordinates
        };
         let savedListing =  await newListing.save();
         console.log(savedListing);
          req.flash("success","Listing successfully added");
         res.redirect("/listings"); 
  };

//edit
module.exports.editForm = async(req,res)=>{
       let {id} = req.params;
       let listing = await Listing.findById(id);
       if(!listing){
          req.flash("error","Listing you requested is not exist ");
          return res.redirect("/listings");
       }
       let originalImg = listing?.image?.url || "";
       if (originalImg.includes("/upload")) {
           originalImg = originalImg.replace(/\/upload\/.*?(?=\/v)/, "/upload/	h_250,w_250,c_fill,ar_1:1");
       }
       res.render("listings/edit.ejs", { listing, originalImg });
   };

//update
module.exports.updateListing = async (req,res)=>{
    
        let {id} = req.params;

        let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
        
        if(typeof req.file !== "undefined"){
         let url =  req.file.path;
         let filename = req.file.filename; 
  
          listing.image = {url,filename};
          await listing.save();
        }

        req.flash("success","Listing Updated!");
        
        res.redirect("/listings");
};

//delete
 module.exports.deleteListing = async (req,res) => {
      let {id} = req.params;
      await Listing.findByIdAndDelete(id);
      req.flash("success"," Listing Deleted!");
      res.redirect("/listings");
  };