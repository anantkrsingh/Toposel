const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: String,
  email:{type:String,required:"Email is required",unique:true},
  userName: { type: String, required: "Username is required", unique: true },
  password: { type: String, required: "Password is required " },
  gender: { type: String, enum: ["male", "female", "other"] },
  dob: { type: Date, required: "DOB is required" },
  country: { type: String, required: "Country is required" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("users", userSchema);

module.exports = { User };
