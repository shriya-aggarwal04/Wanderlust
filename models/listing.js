const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://media.istockphoto.com/id/909423306/photo/modern-multilevel-house-exterior-with-pool.jpg?s=612x612&w=is&k=20&c=l8z-O0GwqW7YEPmXl1YQ5IE1cepggwD7HpQyAtGwNik=",
        set: (v) => v === ""?"https://media.istockphoto.com/id/909423306/photo/modern-multilevel-house-exterior-with-pool.jpg?s=612x612&w=is&k=20&c=l8z-O0GwqW7YEPmXl1YQ5IE1cepggwD7HpQyAtGwNik=":v
    },
    price: Number,
    location: String,
    country:String,
    reviews: [
        {
           type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;