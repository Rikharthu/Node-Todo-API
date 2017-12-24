// We do not require our configured mongoose object, we can use regular one here
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

/*
{
    email: 'andrew@example.com',
    password: 'myPass123',
    tokens: [{
        access:'auth',
        token: 'psdjaiofharoigbtaodggwer'
    }]
}
*/

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        unique: true,
        // custom validation
        validate: {
            validator: (value) => {
                // test against email regex
                // return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
                // use 'validator' module
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
}, {
    usePushEach: true
});

// Override a method
// toJSON - what exactly gets sent back when mongoose model is converted to a JSON value
UserSchema.methods.toJSON = function () {
    const user = this;
    var userObject = user.toObject();
    // Pick what properties we want to return to the user
    return _.pick(userObject, ['_id', 'email']);
}

// Create a new method
UserSchema.methods.generateAuthToken = function () {
    // we use function instead of arrow, because we need 'this' keyword bound
    const user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString();

    // Add token to the database
    user.tokens.push({
        access,
        token
    });

    // Finally save document and return new token
    // Return the promise to allow chaining upon it
    return user.save().then(() => {
        return token;
    })
};

// Module method
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded; // decoded jwt values

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject('Unable to verify JWT token');
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

var User = mongoose.model('User', UserSchema);

module.exports = {
    User
};