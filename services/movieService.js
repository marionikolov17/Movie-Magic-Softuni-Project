const movieModel = require("../models/Movie");

const getMovies = async () => movieModel.find().lean();

const getMovie = async (id) => movieModel.findById(id).lean();

const createMovie = async (data) => movieModel.create(data);

const editMovie = async (id, data) => movieModel.findByIdAndUpdate(id, data);

const deleteMovie = async (id) => movieModel.findByIdAndDelete(id);

const attachCast = async (id, cast) => movieModel.findByIdAndUpdate(id, { $push: { cast: cast } });

const getMovieCasts = async (id) => movieModel.findById(id).populate('cast').lean();

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    editMovie,
    deleteMovie,
    attachCast,
    getMovieCasts
}
