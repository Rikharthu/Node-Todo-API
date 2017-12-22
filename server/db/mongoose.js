var mongoose = require('mongoose');

// Configure mongoose promises
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
});

module.exports = {
    mongoose
};

// process.end.NODE_ENV === 'production'