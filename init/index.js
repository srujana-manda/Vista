
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listing.js");


// mongoose connected

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log(err));

async function main(){
   await mongoose.connect(MONGO_URL);
}

cancelIdleCallback


const initDB = async () =>{
 
   initData.data = initData.data.map((obj)=> ({...obj , owner: "6828adcbeed4c395d0ec6b70"}))
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
}

initDB();