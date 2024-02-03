const userModel = require("./../models/User");

const registerUser = (data) => userModel.create(data);

module.exports = {
    registerUser
}