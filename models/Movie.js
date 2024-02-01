const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1970,
        max: 2024
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 300
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(value);
            },
            message: "Image should be valid URL!"
        }
    },
    cast: {
        type: mongoose.Types.ObjectId,
        ref: "Cast"
    }
});

const movieModel = mongoose.model("Movie", movieSchema);

module.exports = movieModel;