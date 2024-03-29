const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    virtuals: {
      rePassword: {}
    },
  }
);

userSchema.pre("save", async function (next) {
  console.log(this.rePassword);
  if (this.password !== this.rePassword) {
    throw new Error("Passwords must match!");
  }

  const hashedPassword = await bcrypt.hash(this.password, 12);

  this.password = hashedPassword;

  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
