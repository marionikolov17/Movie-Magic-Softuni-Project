const bcrypt = require('bcrypt');

const jwt = require("./../utils/jwt");

const userModel = require("./../models/User");

const registerUser = (data) => userModel.create(data);

const loginUser = async (data) => {
    const user = await userModel.findOne({ email: data.email });

    if (!user) {
        throw new Error("Email or password are incorrect!");
    }

    const isCorrectPassword = await bcrypt.compare(data.password, user.password);

    if (!isCorrectPassword) {
        throw new Error("Email or password are incorrect!");
    }

    const token = await jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET, { expiresIn: "24h" });

    return token;
}

module.exports = {
    registerUser,
    loginUser
}