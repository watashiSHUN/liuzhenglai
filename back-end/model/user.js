const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const HttpStatus = require('../http-status-code');
const SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// Encrypt password before saving
UserSchema.pre('save', function (next) {
    let user = this;

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email }).exec((err, user) => {
        if (err) {
            return callback(err);
        } else if (!user) {
            let err = new Error('User not found');
            err.status = HttpStatus.UNAUTHORIZED;
            return callback(err);
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
    })
}

module.exports = mongoose.model('User', UserSchema);