const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path  = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const {listingSchema} = require("./schema.js");
const { log } = require("console");
const Review = require("./models/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main().then(() => {
  console.log("conncted to DB");
  
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get("/", (req,res) => {
    res.send("you are using Airbnb");
});

const validateListing = (req, res, next) => {
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",")
    console.log(errMsg);
    
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
}

// index route
app.get("/listings", wrapAsync( async(req, res) => {
  const allListings =  await Listing.find({});
  res.render("listings/index", { allListings });
  }));

  // new route 
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
})

  // show route
app.get("/listings/:id", wrapAsync(async(req, res) => {
  let {id} =req.params;
  const listing = await  Listing.findById(id);  
  res.render("listings/show.ejs", {listing});
}))

// create route
app.post("/listings", validateListing,
  wrapAsync(async(req, res, next) => {
    // let {title, description, image, price, location, country} = req.body;
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
  
}))

// Edit route
app.get("/listings/:id/edit", wrapAsync(async(req, res) => {
  let {id} = req.params;
  const listing = await  Listing.findById(id);
  res.render("listings/edit.ejs" , {listing})
}));

// update route
app.put("/listings/:id", validateListing,
  wrapAsync(async(req,res) => {
  let {id} = req.params;
   await  Listing.findByIdAndUpdate(id, {...req.body.listing});  
   res.redirect(`/listings/${id}`); 
}));

// delete route
app.delete("/listings/:id", wrapAsync(async(req, res) => {
  let {id} = req.params;
  let deletedListing =  await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
}))

// reviews
// post route
app.post("/listings/:id/reviews", async(req, res) => {
  let listing =  await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  console.log("new review saved");
  res.redirect(`/listings/${listing._id}`);
  
})


// app.get("/testlisting", async(req,res) => {
//    let sampleListing = new Listing({
//     title: "My new Villa",
//     description: "By the beach",
//     image: "",
//     price: 1200,
//     location: "Calangute Goa",
//     country: "India"
//    })
//    await sampleListing.save();
//    console.log("sample was saved");
//    res.send("successful testing");
   
// })

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
})

app.use((err, req, res, next) => {
  let {statusCode=500, message="Something went Wrong!"} = err;
  res.status(statusCode).render("error.ejs",{err});
  // res.status(statusCode).send(message);
})

app.listen(3000, () => {
    console.log("server is listening on port 3000");

})