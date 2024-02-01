const castModel = require("../models/Cast");

const createCast = async (data) => castModel.create(data);

const getCasts = async () => castModel.find().lean();

module.exports = {
    createCast,
    getCasts
}