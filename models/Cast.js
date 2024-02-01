const mongoose = require("mongoose");

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 99
    },
    born: {
        type: String,
        required: true
    },
    nameInMovie: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(value);
            },
            message: "Image should be valid URL!"
        }
    },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie"
    }
});

const castModel = mongoose.Model("Cast", castSchema);

module.exports = castModel;