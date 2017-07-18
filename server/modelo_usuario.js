const mongoose = require('mongoose')
const Schema = mongoose.Schema

var bcrypt = require('bcrypt');
const saltRounds = 10;

let UserSchema = new Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birth: {
    type: String,
    required: true
  },
})


UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});




UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


let UserModel = mongoose.model('Usuario', UserSchema)

module.exports = UserModel;
