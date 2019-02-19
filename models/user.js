const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  username: { type: String, require: true },
  age: { type: Number, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true }
});

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

